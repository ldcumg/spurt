"use client";
import { useEffect, useState } from "react";
import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";

import { GetGoalListParams, GoalListResponse, GoalListItem } from "@/types/goals.types";
import { TodoResponse } from "@/types/todos.types";
import calcPercentage from "@/utils/calcPercentage";
import { useUserQuery } from "@/hooks/queries/useUserQuery";

import GoalHeader from "../_components/GoalHeader";
import GoalBody from "../_components/GoalBody";
import { useParams, useRouter } from "next/navigation";
import { useGoalContext } from "@/hooks/state/goal/useGoalContext";

export default function GoalPage() {
  const router = useRouter();
  const params = useParams();
  const goalId = params?.goalId as string;

  const setGoalId = useGoalContext((state) => state.setGoalId);
  const onGoalAdded = useGoalContext((state) => state.onGoalAdded);
  const onGoalDeleted = useGoalContext((state) => state.onGoalDeleted);

  const [thisGoal, setThisGoal] = useState<GoalListItem | null>(null);
  const [goalList, setGoalList] = useState<GoalListItem[]>([]);
  const [todoList, setTodoList] = useState<TodoResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: user } = useUserQuery();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        // 1. 목표 목록 조회
        const queryParams: GetGoalListParams = { limit: 10 };
        const goalRes = await clientFetcher.get<GoalListResponse>(GOALS_API_PATH.base, { params: queryParams });

        if (goalRes.data.goals && goalRes.data.goals.length > 0) {
          setGoalList(goalRes.data.goals);

          const target = goalRes.data.goals.find((g) => String(g.id) === goalId);
          const currentGoal = target ?? goalRes.data.goals[0];

          setThisGoal(currentGoal);

          if (currentGoal) {
            setGoalId(currentGoal.id);
          }
        }

        // 2. 투두 목록 조회
        const todoRes = await clientFetcher.get<{ todos: TodoResponse[] }>("/todos");
        if (todoRes.data.todos) {
          setTodoList(todoRes.data.todos);
        }
      } catch (error) {
        console.error("데이터 호출 실패", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (goalId) {
      fetchData();
    }
  }, [goalId]);

  // 드롭다운에서 다른 목표 선택 시
  const handleSelectGoal = (selectedGoalId: string) => {
    router.push(`/goals/${selectedGoalId}`);
  };

  // [추가] 새 목표 추가 API 요청
  const handleAddGoal = async (newTitle: string) => {
    try {
      // POST /{teamId}/goals
      const { data: createdGoal } = await clientFetcher.post<GoalListItem>(GOALS_API_PATH.base, {
        title: newTitle,
      });

      onGoalAdded(createdGoal);
      router.push(`/goals/${createdGoal.id}`);
    } catch (error) {
      console.error("새 목표 생성 실패:", error);
      alert("새 목표 생성에 실패했습니다.");
    }
  };

  // [수정] 목표 제목 수정 API 요청
  const handleUpdateTitle = async (newTitle: string) => {
    if (!thisGoal) return;
    const targetGoalId = thisGoal.id;
    try {
      // PATCH /{teamId}/goals/{goalId}
      await clientFetcher.patch(`${GOALS_API_PATH.base}/${thisGoal.id}`, {
        title: newTitle,
      });

      // 현재 선택된 목표의 ID가 요청했던 ID와 동일할 때만 제목 갱신 (제목 갱신 중 다른 목표 선택 대응)
      setThisGoal((prev) => (prev && prev.id === targetGoalId ? { ...prev, title: newTitle } : prev));

      setGoalList((prevList) =>
        prevList.map((item) => (item.id === targetGoalId ? { ...item, title: newTitle } : item)),
      );
    } catch (error) {
      console.error("목표 제목 수정 실패:", error);
      alert("목표 제목 수정에 실패했습니다.");
    }
  };

  // [삭제] 목표 삭제 API
  const handleDeleteGoal = async (deleteId: number) => {
    if (!confirm("정말 이 목표를 삭제하시겠습니까?")) return;

    try {
      await clientFetcher.delete(`${GOALS_API_PATH.base}/${deleteId}`);

      // 스토어에서 다음 목표 ID 계산 후 받아오기
      const nextGoalId = onGoalDeleted(deleteId, goalList);

      setGoalList((prevList) => prevList.filter((item) => item.id !== deleteId));

      if (nextGoalId) {
        router.push(`/goals/${nextGoalId}`);
      } else {
        router.push("/dashboard");
      }

      router.refresh();
    } catch (error) {
      console.error("목표 삭제 실패: ", error);
      alert("목표 삭제에 실패했습니다.");
    }
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
      />
    </div>
  );
}
