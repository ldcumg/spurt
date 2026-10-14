import { Check } from "@/assets/icons";
import { twMerge } from "@/lib/twMerge";
import type { TodoResponse } from "@/types/todos.types";
import clsx from "clsx";

interface TodoItemProps {
  todo: TodoResponse;
  className?: string;
}

export default function TodoItem({ todo, className }: TodoItemProps) {
  const isDone = todo.done;
  const buttonClasses = twMerge(
    clsx(
      `flex w-full flex-row items-center rounded-sm border px-8 py-4 truncate ${isDone ? "border-neutral-200 bg-neutral-100" : "bg-primary-100 border-primary-200"}`,
      className,
    ),
  );

  return (
    <button className={buttonClasses}>
      {isDone && <Check className="size-16 text-neutral-500" />}
      <span className={`text-body-md ${isDone ? "text-neutral-500" : "text-primary-500"}`}>{todo.title}</span>
    </button>
  );
}
