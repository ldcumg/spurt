import { FlagFilled, More, Plus } from "@/assets/icons/index";

import Button from "../Button";
import Badge from "../Badge";
import ProgressBar from "../ProgressBar";
import TodoListItem from "./Todos";
import { TodoItem } from "@/types/typeTodos";
import { GoalItem } from "@/types/typeGoals";

interface GoalCardProps {
  goal: GoalItem;
  todos?: TodoItem[];
}

export default function GoalCard({ goal, todos = [] }: GoalCardProps) {
  // goal 데이터가 아예 없는 경우 방어
  if (!goal) return null;

  const todoCount = goal.todoCount ?? 0;
  const completedCount = goal.completedCount ?? 0;

  return (
    <div className="flex min-h-356 w-full flex-col justify-between gap-20 rounded-[20px] bg-white p-24">
      <div className="flex flex-col gap-12">
        <div className="flex justify-between">
          <div className="flex min-w-0 flex-1 flex-row gap-12">
            <FlagFilled className="shrink-0" />
            <p className="text-title-sm truncate pt-2 leading-none whitespace-nowrap text-neutral-700">
              {goal.title || "목표를 추가하세요."}
            </p>
          </div>
          <More className="shrink-0" />
        </div>
        <ProgressBar
          doneCount={completedCount}
          totalCount={todoCount}
        ></ProgressBar>
        <div className="flex flex-row gap-12">
          <Badge
            type="todo"
            todoCount={todoCount}
          />
          <Badge
            type="done"
            doneCount={completedCount}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-20">
        {/* 할 일 목록 */}
        <div className="flex flex-1 flex-col gap-8 py-8">
          {todos.length > 0 ? (
            todos.slice(0, 3).map((item) => (
              <TodoListItem
                key={item.id}
                todo={item}
              />
            ))
          ) : (
            <p className="text-title-xs flex h-full items-center justify-center">등록된 할 일이 없습니다.</p>
          )}
        </div>
        <Button
          variant={"outline"}
          size={"lg"}
          className="border-primary-500 flex h-48 w-full flex-row items-center justify-center gap-4 bg-white"
        >
          <Plus className="text-primary-600 h-16 w-16 shrink-0" />
          <p className="text-primary-600 text-title-xs truncate">할 일 추가</p>
        </Button>
      </div>
    </div>
  );
}
