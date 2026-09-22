"use client";
import { useState } from "react";
import { Done, Todo } from "@/assets/icons/index";
import { TodoItem } from "@/types/typeTodos";

interface TodoListItemProps {
  todo: TodoItem;
}

export default function TodoListItem({ todo }: TodoListItemProps) {
  const [isDone, setIsDone] = useState(todo.done);
  return (
    <div className="flex min-w-0 flex-1 flex-row items-center gap-8">
      {isDone ? (
        <Done
          onClick={() => setIsDone((prev) => !prev)}
          className="text-primary-600 size-24 shrink-0 cursor-pointer"
        />
      ) : (
        <Todo
          onClick={() => setIsDone((prev) => !prev)}
          className="size-24 shrink-0 cursor-pointer text-neutral-600"
        />
      )}
      <p className="text-title-xs truncate pb-1 whitespace-nowrap text-neutral-700">{todo.title}</p>
    </div>
  );
}
