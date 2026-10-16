"use client";

import AddTodoForm from "./AddTodoForm";
import Modal from "@/components/ui/Modal";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import type { GoalListItem } from "@/types/goals.types";

interface AddTodoTriggerProps {
  aleadySelectedGoal?: GoalListItem;
  aleadySelectedDate?: Date;
  renderItem: (todoDetailOpen: () => void) => React.ReactNode;
}

export default function AddTodoTrigger({ aleadySelectedGoal, aleadySelectedDate, renderItem }: AddTodoTriggerProps) {
  const { isOpen: addTodoIsOpen, open: addTodoOpen, close: addTodoClose } = useDisclosure();

  return (
    <>
      {renderItem(addTodoOpen)}
      <Modal
        title="할 일 생성"
        isOpen={addTodoIsOpen}
        onClose={addTodoClose}
      >
        <AddTodoForm
          addTodoClose={addTodoClose}
          aleadySelectedGoal={aleadySelectedGoal}
          aleadySelectedDate={aleadySelectedDate}
        />
      </Modal>
    </>
  );
}
