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
    <div className="flex flex-row items-center gap-8">
      {isDone ? (
        <Done
          onClick={() => setIsDone((prev) => !prev)}
          className="cursor-pointer"
        />
      ) : (
        <Todo
          onClick={() => setIsDone((prev) => !prev)}
          className="cursor-pointer"
        />
      )}
      <p className="truncate">{todo.title}</p>
    </div>
  );
}
