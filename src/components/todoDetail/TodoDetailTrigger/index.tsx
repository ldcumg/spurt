"use client";

import Modal from "../../ui/Modal";
import TodoContents from "./TodoContents";
import TodoInfo from "./TodoInfo";
import Badge from "@/components/ui/Badge";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import type { TodoResponse } from "@/types/todos.types";

interface TodoDetailTriggerProps {
  todo: TodoResponse;
  renderItem: (todoDetailOpen: () => void) => React.ReactNode;
}

export default function TodoDetailTrigger({ todo, renderItem }: TodoDetailTriggerProps) {
  const { isOpen: todoDetailIsOpen, open: todoDetailOpen, close: todoDetailClose } = useDisclosure();

  return (
    <>
      {renderItem(todoDetailOpen)}
      <Modal
        title={
          <span className="flex w-full flex-row gap-12">
            <span>{todo.title}</span>
            <Badge type={todo.done ? "done" : "todo"} />
          </span>
        }
        isOpen={todoDetailIsOpen}
        onClose={todoDetailClose}
      >
        <div className="flex h-full w-full flex-col gap-24 px-40 py-24">
          <TodoInfo todo={todo} />
          <TodoContents todo={todo} />
        </div>
      </Modal>
    </>
  );
}
