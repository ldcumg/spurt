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
      <div className="flex min-w-0 flex-row items-center gap-8">
        <button
          type="button"
          aria-label={isDone ? "할 일 완료 취소" : "할 일 완료"}
          aria-pressed={isDone}
          onClick={() => setIsDone((prev) => !prev)}
          className="cursor-pointer"
        >
          {isDone ? (
            <Done className="text-primary-600 size-32 shrink-0" />
          ) : (
            <Todo className="size-32 shrink-0 text-neutral-600" />
          )}
        </button>
        <p className={`text-title-xs truncate ${isDone ? "line-through" : ""}`}>{todo.title}</p>
      </div>
      <div className="flex flex-row items-center gap-10">
        {todo.noteIds.length > 0 && <Note className="size-24 text-neutral-600" />}
        <More className="size-24 shrink-0 text-neutral-600" />
      </div>
    </div>
  );
}
