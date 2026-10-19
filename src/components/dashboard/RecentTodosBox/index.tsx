import { Right } from "@/assets/icons/index";
import { TodoResponse } from "@/types/todos.types";
import TodoItem from "../../ui/TodoItem";

interface RecentTodosBoxProps {
  todoList: TodoResponse[];
  handleToggleTodo: (id: number) => void;
}
export default function RecentTodosBox({ todoList, handleToggleTodo }: RecentTodosBoxProps) {
  return (
    <div className="flex flex-col rounded-md bg-white px-20 py-10 shadow-sm">
      <div className="flex flex-row items-center justify-between border-b">
        <p className="text-title-md">최근 등록한 할 일</p>
        <div className="text-body-xs flex flex-row gap-5 leading-none">
          모두 보기
          <Right className="h-16 w-16 shrink-0" />
        </div>
      </div>
      {/** 최근 등록한 할 일을 3개까지 보여줌
       * - 최근 등록한 할 일이 없는 경우 방어
       */}
      {todoList.length > 0 ? (
        [...todoList]
          .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
          .slice(0, 3)
          .map((item) => (
            <TodoItem
              key={item.id}
              todo={item}
              type="goal"
              onToggle={handleToggleTodo}
            />
          ))
      ) : (
        <p>
          최근 등록한 할 일이 없어요
          <br />할 일을 등록해 보세요.
        </p>
      )}
    </div>
  );
}
