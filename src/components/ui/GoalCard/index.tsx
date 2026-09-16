import { FlagFilled, More, Plus, Todo } from "@/assets/icons/index";

import Button from "../Button";
import Badge from "../Badge";

import { Goal, Todos } from "./mock";
import ProgressBar from "../ProgressBar";

{
  /**
    1. 아이콘 완성되면 추가하기
    2. Badge 머지되면 교체하기
    3. props 넘길 수 있게 하기
*/
}

interface GoalItem {
  id: number;
  title: string;
  todoCount: number;
  completedCount: number;
}
interface TodosItem {
  id: number;
  title: string;
  done: boolean;
}

interface GoalCardProps {
  goal: GoalItem;
  todo: TodosItem;
}

export default function GoalCard({ goal, todo }: GoalCardProps) {
  return (
    <div className="flex max-w-[400px] flex-col gap-20 rounded-[20px] bg-white p-24">
      <div className="flex flex-col gap-12">
        <div className="flex justify-between">
          <div className="fles-row flex gap-12">
            <FlagFilled />
            <p>{goal.title}</p>
          </div>
          <More />
        </div>
        <ProgressBar percentage={64}></ProgressBar>
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
        <div className="flex flex-row items-center gap-8">
          <Todo />
          <p className="truncate">{todo.title}</p>
        </div>
        <div className="flex flex-row items-center gap-8">
          <Todo />
          <p className="truncate">{todo.title}</p>
        </div>
        <div className="flex flex-row items-center gap-8">
          <Todo />
          <p className="truncate">{todo.title}</p>
        </div>
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
