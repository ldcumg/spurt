"use client";
import { useState } from "react";
import { Done, FlagFilled, Link, Note, Todo, Upload } from "@/assets/icons/index";
import { TodoItem } from "@/types/typeTodos";

interface TodoListItemProps {
  todo: TodoItem;
}

export default function GoalTodoItem({ todo }: TodoListItemProps) {
  const [isDone, setIsDone] = useState(todo.done);
  return (
    <div className="hover:bg-primary-100 mt-5 flex flex-row items-center justify-between rounded-sm p-5">
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
        <p className="text-title-xs">{todo.title}</p>
      </div>
      <div className="flex flex-row items-center gap-10">
        {todo.linkUrl && <Link className="size-24" />}
        {todo.noteIds && <Note className="size-24" />}
        {todo.fileUrl && <Upload className="size-24" />}
      </div>
    </div>
  );
}
