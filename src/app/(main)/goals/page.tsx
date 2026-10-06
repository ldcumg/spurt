"use client";

//import { GOALS_API_PATH } from "@/constants";
//import { clientFetcher } from "@/lib/axios/clientFetcher";
//import { GetGoalListParams, GoalListResponse } from "@/types/goals.types";
import { FlagFilled, More, Plus, Right } from "@/assets/icons/index";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Todos } from "@/components/ui/GoalCard/mock";
import ProgressRing from "@/components/ui/ProgressRing";
import TodoItem from "@/components/ui/TodoItem";
import { useState } from "react";
//import { GoalListItem } from "@/types/goals.types";
import calcPercentage from "@/utils/calcPercentage";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import { MockGoalList } from "@/mocks/goalCard.mock";
import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { GetGoalListParams, GoalListResponse } from "@/types/goals.types";
import { GoalListItem } from "@/types/goals.types";
import calcPercentage from "@/utils/calcPercentage";
import { useEffect, useState } from "react";

//import { getGoalList } from "@/apis/goals/api";

export default function GoalPage() {
  //const [thisGoal, setThisGoal] = useState<GoalListItem | null>(null);
  const thisGoal = MockGoalList.goals[0];
  //const [isLoading, setIsLoading] = useState(true);
  // 할 일 목록을 부모 state로 관리
  const [todoList, setTodoList] = useState(Todos.todos);

  const { data: user } = useUserQuery();
  {
    /*
  useEffect(() => {
    async function fetchGoalList() {
      try {
        setIsLoading(true);
        const params: GetGoalListParams = { limit: 10 };
        const { data } = await clientFetcher.get<GoalListResponse>(GOALS_API_PATH.base, { params });
        if (data.goals && data.goals.length > 0) setThisGoal(data.goals[0]);
      } catch (error) {
        console.error("목표 목록 API호출 실패", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGoalList();
  }, []);

  // 데이터 로딩 중 처리 (화면 깨짐 방지)
  if (isLoading) {
    return <div className="p-24">목표를 불러오는 중입니다...</div>;
  }
  // 목표가 아예 없을 때의 빈 상태 처리
  if (!thisGoal) {
    return <div className="p-24">등록된 목표가 없습니다.</div>;
  }
*/
  }
  const handleToggleTodo = (id: number) => {
    setTodoList((prevList) => prevList.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };
  const currentGoalTodos = todoList.filter((item) => item.goalId === thisGoal.id);
  const todosList = currentGoalTodos.filter((item) => !item.done);
  const donesList = currentGoalTodos.filter((item) => item.done);
  // 목표 진행도
  const percentage = calcPercentage(thisGoal.completedCount, thisGoal.todoCount);

  return (
    <div className="bg-primary-50 flex h-screen flex-col gap-20 p-24 pt-32">
      <header>
        <p className="text-display">{user?.name}님의 목표</p>
      </header>
      <section>
        <div className="grid h-auto grid-cols-2 gap-12 lg:flex lg:flex-row">
          <div className="col-span-2 flex flex-2 flex-row items-center justify-between gap-8 rounded-md bg-white p-20 shadow-sm">
            <div className="flex flex-row items-center justify-center gap-16">
              <div className="bg-primary-100 flex size-64 shrink-0 items-center justify-center rounded-full">
                <FlagFilled className="text-primary-600 size-32" />
              </div>
              <p className="text-title-md">{thisGoal.title}</p>
            </div>
            <More className="size-32" />
          </div>
          <div className="bg-primary-200 ratio-1 flex flex-1 flex-row items-center justify-between gap-24 rounded-md p-20 shadow-sm">
            <ProgressRing
              totalCount={thisGoal.todoCount}
              doneCount={thisGoal.completedCount}
            />
            <div className="hidden w-full min-[500px]:block">
              <p className="text-title-xs text-primary-700 text-nowrap">목표 진행도</p>
              <p className="text-title-md text-primary-700">
                <span className="text-display text-primary-700">{percentage}</span>%
              </p>
            </div>
          </div>
          <div className="bg-primary-100 flex flex-1 flex-row items-end gap-12 rounded-md p-20 shadow-sm">
            <p className="text-title-md text-nowrap">
              노트 <br />
              모아보기
            </p>
            <Right className="size-32 shrink-0" />
          </div>
        </div>
      </section>
      <section className="flex h-full flex-col gap-24 lg:flex-row">
        <div className="flex-1 rounded-md bg-white p-12 shadow-sm">
          <div className="flex h-60 flex-row items-center justify-between p-8">
            <Badge
              type="todo"
              className="[&>p]:!block"
            />
            <Button
              variant={"outline"}
              className="flex flex-row items-center justify-center gap-8 rounded-full"
            >
              <Plus className="size-16 shrink-0" />
              <p>할 일 추가</p>
            </Button>
          </div>
          <div>
            {/**
             * 목표 상세에서 todo의 타입에 노트와 링크가 없음
             * -> 목표 상세에서 그 역할을 하려면 api 호출이 두번 필요함
             *
             * ==> 할 일 목록 호출해서 goalId 비교하기 !! 로 해결 ~
             */}
            {todosList.length > 0 ? (
              [...todosList]
                .filter((item) => item.goalId === thisGoal.id)
                .map((item) => {
                  //thisGoal.completedCount++;
                  return (
                    <TodoItem
                      key={item.id}
                      todo={item}
                      onToggle={handleToggleTodo}
                    />
                  );
                })
            ) : (
              <p>
                최근 등록한 할 일이 없어요
                <br />할 일을 등록해 보세요.
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-12 shadow-sm">
          <div className="flex h-60 flex-row items-center justify-between p-8">
            <Badge
              type="done"
              className="[&>p]:!block"
            />
          </div>
          <div>
            {donesList.length > 0 ? (
              [...donesList]
                .filter((item) => item.goalId === thisGoal.id)
                .map((item) => {
                  //thisGoal.completedCount--;
                  return (
                    <TodoItem
                      key={item.id}
                      todo={item}
                      onToggle={handleToggleTodo}
                    />
                  );
                })
            ) : (
              <p>
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
