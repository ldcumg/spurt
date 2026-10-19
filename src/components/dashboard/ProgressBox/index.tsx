import ProgressRing from "@/components/ui/ProgressRing";
import { TodoResponse } from "@/types/todos.types";
import React from "react";

interface ProgressBoxProps {
  doneCount: number;
  todoList: TodoResponse[];
}

export default function ProgressBox({ doneCount, todoList }: ProgressBoxProps) {
  return (
    <div className="flex flex-col gap-10 rounded-md bg-white p-20 shadow-sm">
      <p className="text-title-md">전체 진행 상황</p>
      <div className="flex flex-col gap-16 md:flex-row">
        <ProgressRing
          doneCount={doneCount}
          totalCount={todoList.length}
          className="flex-1"
        />
        <div className="flex flex-1 justify-between gap-15">
          <div className="bg-primary-50 flex w-full flex-row gap-10 rounded-md p-16">
            <div className="bg-primary-600 h-16 w-16 rounded-full" />
            <div className="flex flex-col justify-between">
              <p className="text-title-xs leading-none text-neutral-500">완료한 할 일</p>
              <p className="text-title-md md:text-display">{doneCount}</p>
            </div>
          </div>
          <div className="flex w-full flex-row gap-10 rounded-md bg-neutral-100 p-16">
            <div className="h-16 w-16 rounded-full bg-neutral-600" />
            <div className="flex flex-col justify-between">
              <p className="text-title-xs leading-none text-neutral-500">전체 할 일</p>
              <p className="text-title-md md:text-display">{todoList.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
