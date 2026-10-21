import ProgressRing from "@/components/ui/ProgressRing/index";
import { TodoResponse } from "@/types/todos.types";

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
        <div className="hidden flex-1 justify-between gap-15! lg:flex">
          <div className="bg-primary-50 flex min-w-0 flex-1 flex-row gap-10 rounded-md p-16">
            <div className="bg-primary-600 h-16 w-16 shrink-0 rounded-full" />
            <div className="flex min-w-0 flex-col justify-between">
              <p className="text-title-xs truncate leading-none text-neutral-500">완료한 할 일</p>
              <p className="text-title-md md:text-display">{doneCount}</p>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-row gap-10 rounded-md bg-neutral-100 p-16">
            <div className="h-16 w-16 shrink-0 rounded-full bg-neutral-600" />
            <div className="flex min-w-0 flex-col justify-between">
              <p className="text-title-xs truncate leading-none text-neutral-500">전체 할 일</p>
              <p className="text-title-md md:text-display">{todoList.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
