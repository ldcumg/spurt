"use client";

import { Check } from "@/assets/icons";
import TodoDetailTrigger from "@/components/ui/TodoDetailTrigger";
import { twMerge } from "@/lib/twMerge";
import type { TodoResponse } from "@/types/todos.types";
import clsx from "clsx";

interface CalendarTodoItemProps {
  todo: TodoResponse;
  className?: string;
}

export default function CalendarTodoItem({ todo, className }: CalendarTodoItemProps) {
  const isDone = todo.done;
  const buttonClasses = twMerge(
    clsx(
      `flex w-full flex-row items-center rounded-sm border px-8 py-4 truncate ${isDone ? "border-neutral-200 bg-neutral-100" : "bg-primary-100 border-primary-200"}`,
      className,
    ),
  );

  return (
    <TodoDetailTrigger
      todo={todo}
      renderItem={(todoDetailOpen) => (
        <button
          className={buttonClasses}
          onClick={todoDetailOpen}
        >
          {isDone && <Check className="size-16 text-neutral-500" />}
          <span className={`text-body-md ${isDone ? "text-neutral-500" : "text-primary-500"}`}>{todo.title}</span>
        </button>
      )}
    />
  );
}
