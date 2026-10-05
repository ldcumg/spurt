"use client";

import type { AddTodoErrorMassage } from "../types";
import DateInput from "./DateInput";
import { handleAddTodo } from "@/components/addTodo/services";
import { validateLinkUrl, validateTitle } from "@/components/addTodo/utils";
import Modal from "@/components/ui/Modal";
import ModalActions from "@/components/ui/Modal/ModalActions";
import SelectGoalDropdown from "@/components/ui/SelectGoalDropdown";
import TextInput from "@/components/ui/TextInput";
import UploadInput from "@/components/ui/UploadInput";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { useAllGoalQuery } from "@/hooks/queries/goal/useGoalQueries";
import type { GoalListItem } from "@/types/goals.types";
import { createStateKeySetter } from "@/utils/stateUtills";
import { useState, useRef, cloneElement } from "react";

interface AddTodoTriggerProps {
  children: React.ReactElement<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }>;
  aleadySelectedDate?: Date;
}

export default function AddTodoTrigger({ children, aleadySelectedDate }: AddTodoTriggerProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<GoalListItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(aleadySelectedDate ?? null);
  const [error, setError] = useState<AddTodoErrorMassage>({ title: "", goal: "", dueDate: "", file: "", linkUrl: "" });
  const setErrorByKey = createStateKeySetter(setError);
  const isDisabled = !!(!selectedGoal || error.title || error.file || error.linkUrl);
  const { isOpen: addTodoIsOpen, open: addTodoOpen, close: addTodoClose } = useDisclosure();
  const { data: goalData, isPending: isGoalPending, isError: isGoalError, error: goalError } = useAllGoalQuery();
  if (isGoalPending) return <div>Loading...</div>;
  if (isGoalError) return <div>Error: {goalError.message}</div>;
  const {
    data: { goals },
  } = goalData;

  return (
    <>
      {cloneElement(children, {
        onClick: (event) => {
          children.props.onClick?.(event);
          addTodoOpen();
        },
      })}
      <Modal
        title="할 일 생성"
        isOpen={addTodoIsOpen}
        onClose={addTodoClose}
      >
        <form
          onSubmit={(e) =>
            handleAddTodo(e, {
              selectedGoal,
              selectedDate,
              isDisabled,
            })
          }
          ref={formRef}
          className="flex h-full flex-col gap-16"
        >
          <TextInput
            onBlur={(e) => validateTitle(e, setErrorByKey("title"))}
            error={error.title}
            name="title"
            label="제목"
            placeholder="할 일의 제목을 적어 주세요"
          />
          <SelectGoalDropdown
            error={error.goal}
            setError={setErrorByKey("goal")}
            label="목표"
            goalOptions={goals}
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
          />
          <DateInput
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            error={error.dueDate}
            setError={setErrorByKey("dueDate")}
          />
          <UploadInput
            error={error.file}
            label="파일"
            file={file}
            onFileChange={setFile}
          />
          <TextInput
            onBlur={(e) => validateLinkUrl(e, setErrorByKey("linkUrl"))}
            error={error.linkUrl}
            name="linkUrl"
            label="링크"
            placeholder="링크를 업로드해 주세요"
          />
          <ModalActions
            onClose={addTodoClose}
            isConfirmDisabled={isDisabled}
          />
        </form>
      </Modal>
    </>
  );
}
