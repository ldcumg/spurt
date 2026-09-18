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
    <div className="hover:bg-primary-100 mt-5 flex flex-row items-center justify-between rounded-md p-5">
      <div className="flex flex-row items-center gap-8">
        {isDone ? (
          <Done
            onClick={() => setIsDone((prev) => !prev)}
            className="size-32 cursor-pointer"
            viewBox="0 0 16 16"
          />
        ) : (
          <Todo
            onClick={() => setIsDone((prev) => !prev)}
            className="size-32 cursor-pointer"
            viewBox="0 0 16 16"
          />
        )}

        <div className="flex flex-col">
          <p className="text-title-xs">{todo.title}</p>
          <div className="flex flex-row items-center gap-5">
            <FlagFilled
              viewBox="0 0 24 24"
              className="h-16 w-16 shrink-0"
            />
            <p className="text-body-sm">{todo.goal.title}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-10">
        {todo.linkUrl && <Link className="size-24" />}
        {todo.noteIds && <Note className="size-24" />}
        {todo.fileUrl && <Upload className="size-24" />}
      </div>
    </div>
  );
}
