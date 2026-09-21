"use client";
import { useState } from "react";
import { Done, FlagFilled, Link, More, Note, Todo, Upload } from "@/assets/icons/index";
import { TodoItem as td } from "@/types/typeTodos";

type TodoType = "default" | "goal";

interface TodoListItemProps {
  todo: td;
  type?: TodoType;
}

export default function TodoItem({ todo, type = "default" }: TodoListItemProps) {
  const [isDone, setIsDone] = useState(todo.done);
  return (
    <div className="hover:bg-primary-100 @container flex flex-row items-center justify-between rounded-md p-5">
      <div className="flex min-w-0 flex-1 flex-row items-center gap-8">
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
        <div
          className={`flex min-w-0 flex-1 flex-col gap-2 ${type === "goal" ? "@md:grid @md:grid-cols-2 @md:items-center @md:gap-16" : ""} ${isDone ? "line-through" : ""}`}
        >
          <div className="min-w-0">
            <p className="text-title-xs truncate">{todo.title}</p>
          </div>

          {type === "goal" ? (
            <div className="flex min-w-0 gap-4">
              <FlagFilled className="text-primary-600 size-16 shrink-0 @md:size-24" />
              <p className="text-body-md @md:text-title-xs truncate leading-none @md:leading-normal">
                {todo.goal?.title}
              </p>
            </div>
          ) : (
            <></> // goal이 없을 때도 2번 컬럼 공간 비워두기 (레이아웃 틀어짐 방지)
          )}
        </div>
      </div>
      <div className="flex flex-row items-center gap-10">
        {todo.noteIds.length > 0 && <Note className="size-24 text-neutral-600" />}
        <More className="size-24 shrink-0 text-neutral-600" />
      </div>
    </div>
  );
}
