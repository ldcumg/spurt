"use client";

import CalendarTodoItem from "../CalendarTodoItem";
import { Plus } from "@/assets/icons";
import TodoFormTrigger from "@/components/ui/TodoFormTrigger";
import type { TodoResponse } from "@/types/todos.types";
import { formatDate } from "@/utils/calendar";

interface SelectedDateProps {
  selectedDate: Date;
  todoGroupedByDate: Record<string, TodoResponse[]>;
}

export default function TodoForDate({ selectedDate, todoGroupedByDate }: SelectedDateProps) {
  const formattedDate = formatDate(selectedDate);

  return (
    <div className="h-full w-full p-16">
      <div className="mb-16 flex flex-row justify-between">
        <h5 className="text-title-sm">
          {selectedDate.getFullYear()}.{selectedDate.getMonth() + 1}.{selectedDate.getDate()}
        </h5>

        <TodoFormTrigger
          aleadySelectedDate={selectedDate}
          renderItem={(todoFormOpen) => (
            <button
              className="text-primary-500 text-title-sm flex flex-row items-center gap-4"
              onClick={todoFormOpen}
            >
              <Plus className="size-20" />
              <span>할 일 추가</span>
            </button>
          )}
        />
      </div>

      <div>
        {todoGroupedByDate[formattedDate] ? (
          <div className="flex h-160 flex-col gap-6 overflow-y-auto">
            {todoGroupedByDate[formattedDate].map((todo) => (
              <CalendarTodoItem
                key={todo.id}
                todo={todo}
              />
            ))}
          </div>
        ) : (
          <div>할 일이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
