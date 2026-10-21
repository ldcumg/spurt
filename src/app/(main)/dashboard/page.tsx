"use client";

import DashBoardHeader from "./_components/DashboardHeader";
import GraphBox from "./_components/GraphBox";
import MotivationBox from "./_components/MotivationBox";
import ProgressBox from "./_components/ProgressBox";
import RecentTodosBox from "./_components/RecentTodosBox";
import { type dataSet } from "./_components/types";
import { Plus } from "@/assets/icons/index";
import AddGoalTrigger from "@/components/addGoal/AddGoalTrigger";
import Button from "@/components/ui/Button";
import GoalCard from "@/components/ui/GoalCard";
import { GOALS_API_PATH, TODOS_API_PATH } from "@/constants/apiEndpoints";
import { useUserQuery } from "@/hooks/queries/user/useUserQueries";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { GetGoalListParams, GoalListItem, GoalListResponse } from "@/types/goals.types";
import { TodoResponse } from "@/types/todos.types";
import getDoneByDate from "@/utils/getDoneByDate";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: user } = useUserQuery();
  const userName: string = user?.name || "체다치즈";
  const [goalList, setGoalList] = useState<GoalListItem[] | null>(null);
  const [todoList, setTodoList] = useState<TodoResponse[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const params: GetGoalListParams = { limit: 10 };
        const goalRes = await clientFetcher.get<GoalListResponse>(GOALS_API_PATH.base, { params });

        setGoalList(goalRes.data.goals);

        const todoRes = await clientFetcher.get<{ todos: TodoResponse[] }>("/todos");
        if (todoRes.data.todos) {
          setTodoList(todoRes.data.todos);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleToggleTodo = async (id: number) => {
    // 변경 전 대상 찾기
    const targetTodo = todoList.find((item) => item.id === id);
    if (!targetTodo) return;

    // 낙관 업데이트
    const nextDone = !targetTodo.done;
    const now = new Date().toISOString();
    setTodoList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, done: !item.done, updatedAt: now } : item)),
    );

    try {
      await clientFetcher.patch(`${TODOS_API_PATH.base}/${id}`, { done: nextDone });
    } catch (error) {
      console.error("할 일 상태 변경 실패:", error);
      alert("할 일 상태를 변경하지 못했습니다.");

      // 서버 요청 실패 시 이전 상태로 롤백
      setTodoList((prevList) => prevList.map((item) => (item.id === id ? targetTodo : item)));
    }
  };

  const doneCount = todoList.filter((todo) => todo.done).length;
  /**
   * array.reduce((누적값, 현재요소) => {
        return 다음누적값;
      }, 초기값);
   */
  const data = getDoneByDate(todoList);
  const dataSet: dataSet[] = data.map((item) => ({ date: item.date, count: item.count }));
  const weeklyTotalCount = dataSet.reduce((total, item) => total + item.count, 0);

  return (
    <div className="flex flex-col gap-20 px-30 py-40">
      <DashBoardHeader userName={userName} />
      {/**1열 */}
      <section className="grid gap-20 md:grid-cols-2">
        <MotivationBox />
        <ProgressBox
          doneCount={doneCount}
          todoList={todoList}
        />
      </section>
      {/**2열 */}
      <section className="flex flex-col gap-20">
        <RecentTodosBox
          todoList={todoList}
          handleToggleTodo={handleToggleTodo}
        />
        <GraphBox
          dataSet={dataSet}
          weeklyTotalCount={weeklyTotalCount}
        />
      </section>
      {/**3열 */}
      <section className="flex flex-col gap-10">
        <div className="flex flex-row justify-between px-20">
          <p className="text-title-md">목표별 할 일</p>
          <div className="flex flex-row items-center gap-20">
            <AddGoalTrigger>
              <Button
                variant={"outline"}
                className="flex flex-row items-center justify-center gap-10 rounded-full bg-white"
              >
                <Plus
                  className="h-16 w-16 shrink-0"
                  viewBox="0 0 24 24"
                />
                목표 추가
              </Button>
            </AddGoalTrigger>
            <Link href={`/goals/1`}>
              <p className="text-title-xs">더보기</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-10 md:grid md:grid-cols-2 lg:grid-cols-3">
          {goalList && goalList.length > 0 ? (
            [...goalList]
              .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
              .slice(0, 3)
              .map((item) => {
                // const matchedTodos = Todos.todos.filter((todo) => todo.goalId === item.id);
                return (
                  <GoalCard
                    key={item.id}
                    goal={item}
                    todos={todoList.filter((todo) => todo.goalId === item.id)}
                    onToggle={handleToggleTodo}
                  />
                );
              })
          ) : (
            <p className="text-center text-neutral-400">등록된 목표가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
