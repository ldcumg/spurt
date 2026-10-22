"use client";

import { handleAddGoal } from "../service";
import { AddGoalErrorMessage } from "../types";
import { validateTitle } from "@/components/ui/AddTodoTrigger/index.utils";
import Modal from "@/components/ui/Modal";
import ModalActions from "@/components/ui/Modal/ModalActions";
import TextInput from "@/components/ui/TextInput";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { useAddGoalMutation } from "@/hooks/mutations/goal/useGoalMutations";
import { createStateKeySetter } from "@/utils/stateUtills";
import { useRef, useState } from "react";

interface AddGoalTriggerProps {
  children: React.ReactElement<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }>;
}
export default function AddGoalTrigger({ children }: AddGoalTriggerProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen: addGoalIsOpen, open: addGoalOpen, close: addGoalClose } = useDisclosure();
  const [error, setError] = useState<AddGoalErrorMessage>({ title: "" });
  const setErrorByKey = createStateKeySetter(setError);
  const hasError = !!error.title;

  const { mutate: addGoalMutate } = useAddGoalMutation();

  console.log("AddGoalTrigger Imports:", { Modal, ModalActions, TextInput });
  return (
    <>
      {/* {cloneElement(children, {
        onClick: (event) => {
          children.props.onClick?.(event);
          addGoalOpen();
        },
      })} */}
      <div
        onClick={addGoalOpen}
        className="contents"
      >
        {children}
      </div>
      <Modal
        title="목표 생성"
        isOpen={addGoalIsOpen}
        onClose={addGoalClose}
      >
        <form
          onSubmit={(event) => {
            handleAddGoal({ event, addGoalMutate, hasError, addGoalClose });
          }}
          ref={formRef}
          className="flex h-full flex-col"
        >
          <TextInput
            onBlur={(e) => validateTitle(e.target.value, setErrorByKey("title"))}
            error={error.title}
            name="title"
            label="목표 타이틀"
            placeholder="목표의 이름을 적어 주세요"
          />
          <ModalActions
            onClose={addGoalClose}
            //isConfirmDisabled={hasError}
          />
        </form>
      </Modal>
    </>
  );
}
