"use client";
import { useEffect, useState } from "react";
import { clientFetcher } from "@/lib/axios/clientFetcher";

import { GoalListItem } from "@/types/goals.types";
import { TodoResponse } from "@/types/todos.types";
import calcPercentage from "@/utils/calcPercentage";
import { useUserQuery } from "@/hooks/queries/useUserQuery";

import GoalHeader from "@/components/goals/GoalHeader";
import GoalBody from "@/components/goals/GoalBody";
import { useParams, useRouter } from "next/navigation";
import { useGoalContext } from "@/hooks/state/goal/useGoalContext";
import {
  useAddGoalMutation,
  useDeleteGoalMutation,
  useUpdateGoalMutation,
} from "@/hooks/mutations/goal/useGoalMutations";
import { useGoalListQuery, useGoalDetailQuery } from "@/hooks/queries/goal/useGoalQueries";

export default function GoalPage() {
  const router = useRouter();
  const params = useParams();
  const goalId = params?.goalId as string;

  // zustand 전역 상태 액션
  const setGoalId = useGoalContext((state) => state.setGoalId);

  // tanstack query 서버 데이터 조회
  const { data: user } = useUserQuery();
  const { data: detailGoal, isLoading: isDetailLoading } = useGoalDetailQuery(goalId);
  const { data: goalData, isLoading: isGoalListLoading } = useGoalListQuery({ limit: 10 });
  const goalList: GoalListItem[] = goalData && "goals" in goalData ? goalData.goals : [];

  const matchedGoal = goalList.find((g) => String(g.id) === goalId);
  const thisGoal: GoalListItem | null = matchedGoal
    ? {
        ...matchedGoal,
        title: detailGoal?.title ?? matchedGoal.title, // 상세에서 수정된 최신 제목 반영
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

  const isLoading = isDetailLoading || isGoalListLoading;

  // tanstack query mutation 훅
  const { mutate: addGoalMutate } = useAddGoalMutation();
  const { mutate: updateGoalMutate } = useUpdateGoalMutation();
  const { mutate: deleteGoalMutate } = useDeleteGoalMutation();

  // 현재 상세 목표 식별
  const [todoList, setTodoList] = useState<TodoResponse[]>([]);
  const [isTodoLoading, setIsTodoLoading] = useState(true);

  // 목표 식별 시 Zustand 활성 목표 ID 동기화
  useEffect(() => {
    if (thisGoal?.id) {
      setGoalId(thisGoal.id);
    }
  }, [thisGoal?.id, setGoalId]);

  // 투두 목록 조회 (투두 API)
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

  // 드롭다운에서 다른 목표 선택 시
  const handleSelectGoal = (selectedGoalId: string) => {
    router.push(`/goals/${selectedGoalId}`);
  };

  // [추가] 새 목표 추가 API 요청
  const handleAddGoal = (newTitle: string) => {
    addGoalMutate(
      { title: newTitle },
      {
        onSuccess: (createdGoal) => {
          setGoalId(createdGoal.id);
          router.push(`/goals/${createdGoal.id}`);
        },
        onError: (error) => {
          console.error("새 목표 생성 실패: ", error);
          alert("새 목표 생성에 실패했습니다.");
        },
      },
    );
  };

  // [수정] 목표 제목 수정 API 요청
  const handleUpdateTitle = (newTitle: string) => {
    if (!thisGoal) return;
    const targetGoalId = thisGoal.id;

    updateGoalMutate(
      { goalId: targetGoalId, title: newTitle },
      {
        onError: (error) => {
          console.error("목표 제목 수정 실패: ", error);
          alert("목표 제목 수정에 실패했습니다.");
        },
      },
    );
  };

  // [삭제] 목표 삭제 API
  const handleDeleteGoal = (deleteId: number) => {
    if (!confirm("정말 이 목표를 삭제하시겠습니까?")) return;

    deleteGoalMutate(deleteId, {
      onSuccess: () => {
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

  // 데이터 로딩 중 처리 (화면 깨짐 방지)
  if (isLoading) {
    return <div className="p-24">목표를 불러오는 중입니다...</div>;
  }
  // 목표가 아예 없을 때의 빈 상태 처리
  if (!thisGoal) {
    return <div className="p-24">등록된 목표가 없습니다.</div>;
  }

  const currentGoalTodos = todoList.filter((item) => item.goalId === thisGoal.id);
  const todosList = currentGoalTodos.filter((item) => !item.done);
  const donesList = currentGoalTodos.filter((item) => item.done);

  // 실시간으로 변하는 투두 상태 반영 (분모가 0일 때 방어)
  const totalCount = currentGoalTodos.length || thisGoal.todoCount || 0;
  const doneCount = donesList.length;
  const percentage = totalCount > 0 ? calcPercentage(doneCount, totalCount) : 0;

  return (
    <div className="bg-primary-50 flex min-h-full flex-col gap-20 p-24 pt-32">
      <header>
        <p className="text-display">{user?.name || "체다치즈"} 님의 목표</p>
      </header>
      <GoalHeader
        key={thisGoal.title}
        goal={thisGoal}
        goalList={goalList!}
        totalCount={totalCount}
        doneCount={doneCount}
        percentage={percentage}
        onSelectGoal={handleSelectGoal}
        onAddGoal={handleAddGoal}
        onUpdateTitle={handleUpdateTitle}
        onDeleteGoal={handleDeleteGoal}
      />
      <GoalBody
        goal={thisGoal}
        todosList={todosList}
        donesList={donesList}
        handleToggleTodo={handleToggleTodo}
        isTodoLoading={isTodoLoading}
      />
    </div>
  );
}
