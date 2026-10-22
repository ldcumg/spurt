"use client";

import TodoForm from "./TodoForm";
import Modal from "@/components/ui/Modal";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import type { GoalListItem } from "@/types/goals.types";
import type { TodoResponse } from "@/types/todos.types";

interface TodoFormTriggerProps {
  aleadySelectedGoal?: GoalListItem;
  aleadySelectedDate?: Date;
  todo?: TodoResponse;
  renderItem: (todoDetailOpen: () => void) => React.ReactNode;
}

export default function TodoFormTrigger({
  aleadySelectedGoal,
  aleadySelectedDate,
  todo,
  renderItem,
}: TodoFormTriggerProps) {
  const { isOpen: todoFormIsOpen, open: todoFormOpen, close: todoFormClose } = useDisclosure();

  return (
    <>
      {renderItem(todoFormOpen)}
      <Modal
        className="p-24 md:p-32"
        title={todo ? "할 일 수정" : "할 일 생성"}
        isOpen={todoFormIsOpen}
        onClose={todoFormClose}
      >
        <TodoForm
          todoFormClose={todoFormClose}
          aleadySelectedGoal={aleadySelectedGoal}
          aleadySelectedDate={aleadySelectedDate}
          todo={todo}
        />
      </Modal>
    </>
  );
}
