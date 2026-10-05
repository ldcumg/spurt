import TodoItem from "./TodoItem";
import { Plus } from "@/assets/icons";
import { formatDate } from "@/components/calendar/utils";
import type { Todo } from "@/types/todos.types";

interface SelectedDateProps {
  selectedDate: Date;
  todoGroupedByDate: Record<string, Todo[]>;
}

export default function TodoForDate({ selectedDate, todoGroupedByDate }: SelectedDateProps) {
  const formattedDate = formatDate(selectedDate);

  return (
    <div className="h-full w-full p-16">
      <div className="mb-16 flex flex-row justify-between">
        <h5 className="text-title-sm">
          {selectedDate.getFullYear()}.{selectedDate.getMonth() + 1}.{selectedDate.getDate()}
        </h5>

        <button className="text-primary-500 text-title-sm flex flex-row items-center gap-4">
          <Plus className="size-20" />
          <span>할 일 추가</span>
        </button>
      </div>

      <div>
        {todoGroupedByDate[formattedDate] ? (
          <div className="flex h-200 flex-col gap-6 overflow-y-auto">
            {todoGroupedByDate[formattedDate].map((todo) => (
              <TodoItem
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
