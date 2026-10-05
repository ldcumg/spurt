import { Check } from "@/assets/icons";
import type { TodoResponse } from "@/types/todos.types";

interface TodoItemProps {
  todo: TodoResponse;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const isDone = todo.done;

  return (
    <button
      className={`flex flex-row items-center rounded-sm border px-8 py-4 ${isDone ? "border-neutral-200 bg-neutral-100" : "bg-primary-100 border-primary-200"}`}
    >
      {isDone && <Check className="size-16 text-neutral-500" />}
      <span className={`text-body-md ${isDone ? "text-neutral-500" : "text-primary-500"}`}>{todo.title}</span>
    </button>
  );
}
