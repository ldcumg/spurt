"use client";

import Modal from "../Modal";
import TodoContents from "./TodoContents";
import TodoInfo from "./TodoInfo";
import Badge from "@/components/ui/Badge";
import { useClickOutside } from "@/hooks/disclosure/useClickOutside";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import type { TodoResponse } from "@/types/todos.types";

interface TodoDetailTriggerProps {
  todo: TodoResponse;
  renderItem: (todoDetailOpen: () => void) => React.ReactNode;
}

export default function TodoDetailTrigger({ todo, renderItem }: TodoDetailTriggerProps) {
  console.log("[ ㏒ ] todo =>", todo);
  const { isOpen: todoDetailIsOpen, open: todoDetailOpen, close: todoDetailClose } = useDisclosure();
  const containerRef = useClickOutside(() => {
    todoDetailClose();
  });

  return (
    <>
      {renderItem(todoDetailOpen)}
      <Modal
        className="p-32 md:p-40"
        ref={containerRef}
        title={
          <span className="flex w-full flex-row gap-12 md:gap-16">
            <span>{todo.title}</span>
            <Badge type={todo.done ? "done" : "todo"} />
          </span>
        }
        isOpen={todoDetailIsOpen}
        onClose={todoDetailClose}
      >
        <div className="flex h-full w-full flex-col gap-24 pt-24">
          <TodoInfo todo={todo} />
          <TodoContents todo={todo} />
        </div>
      </Modal>
    </>
  );
}
