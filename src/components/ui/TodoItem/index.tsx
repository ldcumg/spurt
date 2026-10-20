"use client";

import TextDropdown from "../TextDropdown";
import TodoFormTrigger from "../TodoFormTrigger";
import { Done, FlagFilled, Note, Todo } from "@/assets/icons/index";
import TodoDetailTrigger from "@/components/ui/TodoDetailTrigger";
import { useDeleteTodoMutation } from "@/hooks/mutations/todo/useTodoMutations";
import { deleteTodo } from "@/services/deleteTodo";
import { TodoResponse } from "@/types/todos.types";

type TodoType = "default" | "goal";

interface TodoListItemProps {
  todo: TodoResponse;
  type?: TodoType;
  onToggle?: (id: number) => void;
}

export default function TodoItem({ todo, type = "default", onToggle }: TodoListItemProps) {
  const { mutate: deleteTodoMutate } = useDeleteTodoMutation(todo.id);

  return (
    <div className="hover:bg-primary-100 @container flex flex-row items-center justify-between rounded-md p-5">
      <div className="flex min-w-0 flex-1 flex-row items-center gap-8">
        <button
          type="button"
          aria-label={todo.done ? "할 일 완료 취소" : "할 일 완료"}
          aria-pressed={todo.done}
          onClick={() => onToggle?.(todo.id)}
          className="cursor-pointer"
        >
          {todo.done ? (
            <Done className="text-primary-600 size-32 shrink-0" />
          ) : (
            <Todo className="size-32 shrink-0 text-neutral-600" />
          )}
        </button>
        <TodoDetailTrigger
          todo={todo}
          renderItem={(todoDetailOpen) => (
            <div
              className={`flex min-w-0 flex-1 cursor-pointer flex-col gap-2 ${type === "goal" ? "@md:grid @md:grid-cols-2 @md:items-center @md:gap-16" : ""} `}
              onClick={todoDetailOpen}
            >
              <div className="min-w-0">
                <p className={`text-title-xs truncate ${todo.done ? "line-through" : ""}`}>{todo.title}</p>
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
          )}
        />
      </div>
      <div className="ml-10 flex flex-row items-center gap-10">
        {todo.noteIds.length > 0 ? (
          <Note className="size-24 cursor-pointer text-neutral-600" />
        ) : (
          <div className="size-24" />
        )}
        <TodoFormTrigger
          todo={todo}
          renderItem={(todoFormOpen) => (
            //NOTE - 모달 구조 리팩토링 예정
            <TextDropdown
              options={[
                {
                  lable: "수정하기",
                  onClick: todoFormOpen,
                },
                {
                  lable: "삭제하기",
                  onClick: () => deleteTodo(deleteTodoMutate),
                },
              ]}
            />
          )}
        />
      </div>
    </div>
  );
}
