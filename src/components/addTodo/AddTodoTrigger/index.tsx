"use client";

import UploadInput from "../../ui/UploadInput";
import DateInput from "../DateInput";
import type { AddTodoErrorMassage } from "../types";
import { handleAddTodo } from "@/components/addTodo/services";
import { validateLinkUrl, validateTitle } from "@/components/addTodo/utils";
import Modal from "@/components/ui/Modal";
import ModalActions from "@/components/ui/Modal/ModalActions";
import SelectGoalDropdown from "@/components/ui/SelectGoalDropdown";
import TextInput from "@/components/ui/TextInput";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import type { GoalResponse } from "@/types/goals.types";
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
  const [selectedGoal, setSelectedGoal] = useState<GoalResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(aleadySelectedDate ?? null);
  const [error, setError] = useState<AddTodoErrorMassage>({ title: "", goal: "", file: "", linkUrl: "" });
  const setErrorByKey = createStateKeySetter(setError);
  const isDisabled = !!(!selectedGoal || error.title || error.file || error.linkUrl);
  const { isOpen: addTodoIsOpen, open: addTodoOpen, close: addTodoClose } = useDisclosure();

  //NOTE - 임시 데이터
  const goals: GoalResponse[] = [
    {
      id: 1,
      title: "자바스크립트로 웹 서비스 만들기",
      teamId: "string",
      userId: 1,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 2,
      title: "디자인 시스템 강의 듣기",
      teamId: "string",
      userId: 1,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 3,
      title: "프론트엔드 포트폴리오 완성하기",
      teamId: "string",
      userId: 1,
      createdAt: "",
      updatedAt: "",
    },
  ];

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
              setGoalError: setErrorByKey("goal"),
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
            label="목표"
            goalOptions={goals}
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
          />
          <DateInput
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
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
