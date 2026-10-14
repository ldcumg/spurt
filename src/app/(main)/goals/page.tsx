"use client";
import { useEffect, useState } from "react";
import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";

import { GetGoalListParams, GoalListResponse, GoalListItem } from "@/types/goals.types";
import { TodoResponse } from "@/types/todos.types";
import calcPercentage from "@/utils/calcPercentage";
import { useUserQuery } from "@/hooks/queries/useUserQuery";

import GoalHeader from "@/components/goals/GoalHeader";
import GoalBody from "@/components/goals/GoalBody";

//import { getGoalList } from "@/apis/goals/api";

export default function GoalPage() {
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
        const params: GetGoalListParams = { limit: 10 };
        const goalRes = await clientFetcher.get<GoalListResponse>(GOALS_API_PATH.base, { params });

        let firstGoal: GoalListItem | null = null;
        if (goalRes.data.goals && goalRes.data.goals.length > 0) {
          firstGoal = goalRes.data.goals[0];
          setGoalList(goalRes.data.goals);
          setThisGoal(firstGoal);
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

    fetchData();
  }, []);

  // 2. 드롭다운에서 다른 목표 선택 시
  const handleSelectGoal = (selectedGoalId: string) => {
    const target = goalList.find((item) => String(item.id) === selectedGoalId);
    if (target) {
      setThisGoal(target);
    }
  };

  // 3. 목표 제목 수정 API 요청
  const handleUpdateTitle = async (newTitle: string) => {
    if (!thisGoal) return;
    try {
      // PATCH /{teamId}/goals/{goalId}
      await clientFetcher.patch(`${GOALS_API_PATH.base}/${thisGoal.id}`, {
        title: newTitle,
      });

      // 클라이언트 상태 반영
      setThisGoal((prev) => (prev ? { ...prev, title: newTitle } : null));
      setGoalList((prevList) =>
        prevList.map((item) => (item.id === thisGoal.id ? { ...item, title: newTitle } : item)),
      );
    } catch (error) {
      console.error("목표 제목 수정 실패:", error);
      alert("목표 제목 수정에 실패했습니다.");
    }
  };

  // 4. 새 목표 추가 API 요청
  const handleAddGoal = async (newTitle: string) => {
    try {
      // POST /{teamId}/goals
      const { data: createdGoal } = await clientFetcher.post<GoalListItem>(GOALS_API_PATH.base, {
        title: newTitle,
      });

      // 목록에 추가 후 새로 만든 목표를 선택
      setGoalList((prev) => [createdGoal, ...prev]);
      setThisGoal(createdGoal);
    } catch (error) {
      console.error("새 목표 생성 실패:", error);
      alert("새 목표 생성에 실패했습니다.");
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
        <p className="text-display">{user?.name} 님의 목표</p>
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
