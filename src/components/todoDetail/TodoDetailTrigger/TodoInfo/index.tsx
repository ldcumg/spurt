import { Calendar, Flag } from "@/assets/icons";
import { formatDate } from "@/components/calendar/utils";
import type { TodoResponse } from "@/types/todos.types";

interface TodoInfoProps {
  todo: TodoResponse;
}

export default function TodoInfo({ todo }: TodoInfoProps) {
  const dueDate = todo.dueDate;
  return (
    <div className="text-body-md md:text-body-lg flex flex-col gap-16">
      <div className="flex flex-row gap-8">
        <span className="flex items-center gap-4 text-neutral-400">
          <Flag className="size-18" />
          <span>목표</span>
        </span>
        <span>{todo.goal.title}</span>
      </div>

      {dueDate && (
        <div className="flex flex-row gap-8">
          <span className="flex items-center gap-4 text-neutral-400">
            <Calendar className="size-18" />
            <span>마감기한</span>
          </span>
          <span>{formatDate(new Date(dueDate))}</span>
        </div>
      )}
    </div>
  );
}
