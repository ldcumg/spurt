"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "@/assets/icons/index";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import TodoFormTrigger from "@/components/ui/TodoFormTrigger";
import TodoItem from "@/components/ui/TodoItem";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { GoalListItem } from "@/types/goals.types";
import type { TodoResponse } from "@/types/todos.types";
import calcPercentage from "@/utils/calcPercentage";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import { useGoalDetailQuery, useGoalListQuery } from "@/hooks/queries/goal/useGoalQueries";
import {
  useAddGoalMutation,
  useDeleteGoalMutation,
  useUpdateGoalMutation,
} from "@/hooks/mutations/goal/useGoalMutations";
import { useGoalContext } from "@/hooks/state/goal/useGoalContext";
import GoalHeader from "../GoalHeader";

export default function GoalDetailView() {
  const router = useRouter();
  const params = useParams();
  const goalId = params?.goalId as string;

  // 1. Zustand: 마지막 방문 목표 ID 저장 전용 액션
  const setGoalId = useGoalContext((state) => state.setGoalId);

  // 2. TanStack Query: 서버 데이터 조회
  const { data: user } = useUserQuery();
  const { data: detailGoal, isLoading: isDetailLoading } = useGoalDetailQuery(goalId);
  const { data: goalData, isLoading: isGoalListLoading } = useGoalListQuery({ limit: 10 });
  const goalList: GoalListItem[] = goalData && "goals" in goalData ? goalData.goals : [];

  // 3. 현재 목표 데이터 조합 (수정된 detailGoal의 최신 제목 우선 반영)
  const matchedGoal = goalList.find((g) => String(g.id) === goalId);
  const currentTitle = detailGoal?.title ?? matchedGoal?.title ?? "";

  const thisGoal: GoalListItem | null = matchedGoal
    ? {
        ...matchedGoal,
        title: currentTitle,
      }
    : detailGoal
      ? {
          id: detailGoal.id,
          teamId: detailGoal.teamId,
          userId: detailGoal.userId,
          title: detailGoal.title,
          todoCount: 0,
          completedCount: 0,
          createdAt: detailGoal.createdAt,
          updatedAt: detailGoal.updatedAt,
        }
      : (goalList[0] ?? null);

  // 4. TanStack Query Mutation 훅
  const { mutate: addGoalMutate } = useAddGoalMutation();
  const { mutate: updateGoalMutate } = useUpdateGoalMutation();
  const { mutate: deleteGoalMutate } = useDeleteGoalMutation();

  // 5. 투두 임시 로컬 상태
  const [todoList, setTodoList] = useState<TodoResponse[]>([]);
  const [isTodoLoading, setIsTodoLoading] = useState(true);
  const isLoading = isDetailLoading || isGoalListLoading;

  // 목표 식별 시 Zustand 활성 목표 ID 동기화
  useEffect(() => {
    if (thisGoal?.id) {
      setGoalId(thisGoal.id);
    }
  }, [thisGoal?.id, setGoalId]);

  // 투두 목록 조회
  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsTodoLoading(true);
        const todoRes = await clientFetcher.get<{ todos: TodoResponse[] }>("/todos");
        if (todoRes.data.todos) {
          setTodoList(todoRes.data.todos);
        }
      } catch (error) {
        console.error("투두 호출 실패:", error);
      } finally {
        setIsTodoLoading(false);
      }
    }
    fetchTodos();
  }, []);

  // 드롭다운 변경
  const handleSelectGoal = (selectedGoalId: string) => {
    router.push(`/goals/${selectedGoalId}`);
  };

  // [추가] 새 목표 추가
  const handleAddGoal = (newTitle: string) => {
    addGoalMutate(
      { title: newTitle },
      {
        onSuccess: (createdGoal) => {
          setGoalId(createdGoal.id);
          router.push(`/goals/${createdGoal.id}`);
        },
        onError: (error) => {
          console.error("새 목표 생성 실패:", error);
          alert("새 목표 생성에 실패했습니다.");
        },
      },
    );
  };

  // [수정] 목표 제목 수정
  const handleUpdateTitle = (newTitle: string) => {
    if (!thisGoal) return;
    const targetGoalId = thisGoal.id;

    updateGoalMutate(
      { goalId: targetGoalId, title: newTitle },
      {
        onError: (error) => {
          console.error("목표 제목 수정 실패:", error);
          alert("목표 제목 수정에 실패했습니다.");
        },
      },
    );
  };

  // [삭제] 목표 삭제
  const handleDeleteGoal = (deleteId: number) => {
    if (!confirm("정말 이 목표를 삭제하시겠습니까?")) return;

    deleteGoalMutate(deleteId, {
      onSuccess: () => {
        // TanStack Query 캐시 목록 기준으로 다음 이동 목표 계산
        const remainingGoals = goalList.filter((g) => g.id !== deleteId);
        const nextGoal = remainingGoals[0] ?? null;

        if (nextGoal) {
          setGoalId(nextGoal.id);
          router.push(`/goals/${nextGoal.id}`);
        } else {
          setGoalId(null);
          router.push("/dashboard");
        }
      },
      onError: (error) => {
        console.error("목표 삭제 실패: ", error);
        alert("목표 삭제에 실패했습니다.");
      },
    });
  };

  const handleToggleTodo = (id: number) => {
    setTodoList((prevList) => prevList.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  if (isLoading || isTodoLoading) {
    return <div className="p-24">데이터를 불러오는 중입니다...</div>;
  }

  if (!thisGoal) {
    return <div className="p-24">등록된 목표가 없습니다.</div>;
  }

  const currentGoalTodos = todoList.filter((item) => item.goalId === thisGoal.id);
  const todosList = currentGoalTodos.filter((item) => !item.done);
  const donesList = currentGoalTodos.filter((item) => item.done);

  const totalCount = currentGoalTodos.length || thisGoal.todoCount || 0;
  const doneCount = donesList.length;
  const percentage = totalCount > 0 ? calcPercentage(doneCount, totalCount) : 0;

  return (
    <div className="bg-primary-50 flex min-h-full flex-col gap-20 p-24 pt-32">
      <header>
        <p className="text-display">{user?.name} 님의 목표</p>
      </header>

      {/* key를 넘겨 수정 시 즉시 재렌더링 보장 */}
      <GoalHeader
        key={thisGoal.title}
        goal={thisGoal}
        goalList={goalList}
        totalCount={totalCount}
        doneCount={doneCount}
        percentage={percentage}
        onSelectGoal={handleSelectGoal}
        onAddGoal={handleAddGoal}
        onUpdateTitle={handleUpdateTitle}
        onDeleteGoal={handleDeleteGoal}
      />

      <section className="flex flex-1 flex-col gap-24 lg:flex-row">
        {/* 미완료 할 일 */}
        <div className="flex-1 rounded-md bg-white p-12 shadow-sm">
          <div className="flex h-60 flex-row items-center justify-between p-8">
            <Badge
              type="todo"
              className="[&>p]:!block"
            />
            <TodoFormTrigger
              renderItem={(todoFormOpen) => (
                <Button
                  onClick={todoFormOpen}
                  variant={"outline"}
                  className="flex flex-row items-center justify-center gap-8 rounded-full"
                >
                  <Plus className="size-16 shrink-0" />
                  <p>할 일 추가</p>
                </Button>
              )}
            />
          </div>
          <div>
            {todosList.length > 0 ? (
              todosList.map((item) => (
                <TodoItem
                  key={item.id}
                  todo={item}
                  onToggle={handleToggleTodo}
                />
              ))
            ) : (
              <p className="p-12 text-neutral-400">
                최근 등록한 할 일이 없어요
                <br />할 일을 등록해 보세요.
              </p>
            )}
          </div>
        </div>

        {/* 완료된 할 일 */}
        <div className="flex-1 rounded-md bg-white p-12 shadow-sm">
          <div className="flex h-60 flex-row items-center justify-between p-8">
            <Badge
              type="done"
              className="[&>p]:!block"
            />
          </div>
          <div>
            {donesList.length > 0 ? (
              donesList.map((item) => (
                <TodoItem
                  key={item.id}
                  todo={item}
                  onToggle={handleToggleTodo}
                />
              ))
            ) : (
              <p className="p-12 text-neutral-400">
                완료한 할 일이 없어요
                <br />할 일을 완료해 보세요.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
