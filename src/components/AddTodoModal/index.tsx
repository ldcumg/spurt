"use client";

import UploadInput from "../ui/UploadInput";
import type { AddTodoErrorMassage } from "./types";
import SelectGoalDropdown from "@/components/AddTodoModal/SelectGoalDropdown";
import Modal from "@/components/ui/Modal";
import ModalActions from "@/components/ui/Modal/ModalActions";
import TextInput from "@/components/ui/TextInput";
import { handleAddTodo } from "@/services/todo/addTodo";
import { validateLinkUrl, validateTitle } from "@/services/todo/addTodoValidate";
import type { GoalItem } from "@/types/typeGoals";
import { createStateKeySetter } from "@/utils/stateUtills";
import { useState, useRef } from "react";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** 할 일 정보를 입력하고 제출하는 모달을 렌더링합니다. */
export default function AddTodoModal({ isOpen, onClose }: AddTodoModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<GoalItem | null>(null);
  const [error, setError] = useState<AddTodoErrorMassage>({ title: "", goal: "", file: "", linkUrl: "" });
  const setErrorByKey = createStateKeySetter(setError);
  const isDisabled = !!(!selectedGoal || error.title || error.file || error.linkUrl);

  //NOTE - 임시 데이터
  const goals: GoalItem[] = [
    {
      id: 1,
      title: "자바스크립트로 웹 서비스 만들기",
      teamId: "string",
      userId: 1,
      todoCount: 1,
      completedCount: 1,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 2,
      title: "디자인 시스템 강의 듣기",
      teamId: "string",
      userId: 1,
      todoCount: 1,
      completedCount: 1,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 3,
      title: "프론트엔드 포트폴리오 완성하기",
      teamId: "string",
      userId: 1,
      todoCount: 1,
      completedCount: 1,
      createdAt: "",
      updatedAt: "",
    },
  ];

  return (
    <Modal
      title="할 일 생성"
      isOpen={isOpen}
      onClose={onClose}
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
        className="flex h-full flex-col"
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
          onClose={onClose}
          isConfirmDisabled={isDisabled}
        />
      </form>
    </Modal>
  );
}
