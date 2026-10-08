import { Calendar, Flag } from "@/assets/icons";
import type { TodoResponse } from "@/types/todos.types";

interface TodoInfoProps {
  todo: TodoResponse;
}

export default function TodoInfo({ todo }: TodoInfoProps) {
  const goalInfo = todo.goal;
  return (
    <div className="flex flex-col gap-16">
      {goalInfo && (
        <div className="flex flex-row gap-8">
          <span className="flex items-center gap-4 text-neutral-400">
            <Flag className="size-18" />
            <span>목표</span>
          </span>
          <span>{goalInfo.title}</span>
        </div>
      )}

      <div className="flex flex-row gap-8">
        <span className="flex items-center gap-4 text-neutral-400">
          <Calendar className="size-18" />
          <span>마감기한</span>
        </span>
        <span>{todo.dueDate}</span>
      </div>
    </div>
  );
}
