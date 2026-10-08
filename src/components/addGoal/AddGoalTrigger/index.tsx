"use client";
import Modal from "@/components/ui/Modal";
import ModalActions from "@/components/ui/Modal/ModalActions";
import TextInput from "@/components/ui/TextInput";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { cloneElement, useRef, useState } from "react";
import { handleAddGoal } from "../service";

interface AddGoalTriggerProps {
  children: React.ReactElement<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }>;
}
export default function AddGoalTrigger({ children }: AddGoalTriggerProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen: addGoalIsOpen, open: addGoalOpen, close: addGoalClose } = useDisclosure();
  const [isWriting, setIsWriting] = useState(false);
  const isDisabled = !!!isWriting;
  console.log("AddGoalTrigger Imports:", { Modal, ModalActions, TextInput });
  return (
    <>
      {cloneElement(children, {
        onClick: (event) => {
          children.props.onClick?.(event);
          addGoalOpen();
        },
      })}
      <Modal
        title="목표 생성"
        isOpen={addGoalIsOpen}
        onClose={addGoalClose}
      >
        <form
          onSubmit={(e) => {
            handleAddGoal(e, { isDisabled });
          }}
          ref={formRef}
          className="flex h-full flex-col"
        >
          <TextInput
            label="목표 타이틀"
            error="목표의 이름을 지정해 주세요."
            name="title"
            placeholder="목표의 이름을 적어 주세요"
            onClick={() => setIsWriting(true)}
          />
          <ModalActions
            onClose={addGoalClose}
            isConfirmDisabled={isDisabled}
          />
        </form>
      </Modal>
    </>
  );
}
