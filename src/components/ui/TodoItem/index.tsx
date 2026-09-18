"use client";
import { useState } from "react";
import { Done, FlagFilled, Link, More, Note, Todo, Upload } from "@/assets/icons/index";
import { TodoItem as td } from "@/types/typeTodos";

interface TodoListItemProps {
  todo: td;
}

export default function TodoItem({ todo }: TodoListItemProps) {
  const [isDone, setIsDone] = useState(todo.done);
  return (
    <div className="hover:bg-primary-100 flex flex-row items-center justify-between rounded-md p-5">
      <div className="flex flex-row items-center gap-8">
        {isDone ? (
          <Done
            onClick={() => setIsDone((prev) => !prev)}
            className="text-primary-600 size-32 shrink-0 cursor-pointer"
          />
        ) : (
          <Todo
            onClick={() => setIsDone((prev) => !prev)}
            className="size-32 shrink-0 cursor-pointer text-neutral-600"
          />
        )}
        <p className={`text-title-xs ${isDone ? "line-through" : ""}`}>{todo.title}</p>
      </div>
      <div className="flex flex-row items-center gap-10">
        {todo.noteIds && <Note className="size-24 text-neutral-600" />}
        <More className="size-24 shrink-0 text-neutral-600" />
      </div>
    </div>
  );
}
