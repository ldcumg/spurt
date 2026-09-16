import { FlagFilled, More, Plus } from "@/assets/icons/index";

import Button from "../Button";
import Badge from "../Badge";
import ProgressBar from "../ProgressBar";
import TodoListItem from "./Todos";
import { TodoItem } from "@/types/typeTodos";
import { GoalItem } from "@/types/typeGoals";

interface GoalCardProps {
  goal: GoalItem;
  todos: TodoItem[];
}

export default function GoalCard({ goal, todos }: GoalCardProps) {
  return (
    <div className="flex w-full flex-col gap-20 rounded-[20px] bg-white p-24">
      <div className="flex flex-col gap-12">
        <div className="flex justify-between">
          <div className="fles-row flex gap-12">
            <FlagFilled />
            <p>{goal.title}</p>
          </div>
          <More />
        </div>
        <ProgressBar
          doneCount={goal.completedCount}
          totalCount={goal.todoCount}
        ></ProgressBar>
        <div className="flex flex-row gap-12">
          <Badge
            type="todo"
            todoCount={goal.todoCount}
          />
          <Badge
            type="done"
            doneCount={goal.completedCount}
          />
        </div>
      </div>
      {/* 할 일 목록 */}
      <div className="flex flex-col gap-8 py-8">
        {todos.map((item) => (
          <div
            key={item.id}
            className="flex flex-row items-center gap-8"
          >
            <TodoListItem todo={item} />
          </div>
        ))}
      </div>
      <Button
        variant={"outline"}
        size={"lg"}
        className="border-primary-500 flex w-full flex-row items-center justify-center gap-4 bg-white"
      >
        <Plus className="text-primary-600 h-16 w-16 shrink-0" />
        <p className="text-primary-600">할 일 추가</p>
      </Button>
    </div>
  );
}
