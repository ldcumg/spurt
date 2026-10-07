"use client";

import { handleAddTodo } from "../../services";
import type { AddTodoErrorMassage, FormState } from "../../types";
import { validateLinkUrl, validateTitle } from "../../utils";
import DateInput from "./DateInput";
import ModalActions from "@/components/ui/Modal/ModalActions";
import SelectGoalDropdown from "@/components/ui/SelectGoalDropdown";
import TextInput from "@/components/ui/TextInput";
import UploadInput from "@/components/ui/UploadInput";
import { useAddTodoMutation } from "@/hooks/mutations/todo/useTodoMutations";
import { createStateKeySetter } from "@/utils/stateUtills";
import { useRef, useState } from "react";

interface AddTodoFormProps {
  addTodoClose: () => void;
  aleadySelectedDate?: Date;
}

export default function AddTodoForm({ addTodoClose, aleadySelectedDate }: AddTodoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>({
    file: null,
    selectedGoal: null,
    selectedDate: aleadySelectedDate ?? null,
  });
  const [error, setError] = useState<AddTodoErrorMassage>({ title: "", goal: "", dueDate: "", file: "", linkUrl: "" });
  const setFormStateByKey = createStateKeySetter(setFormState);
  const setErrorByKey = createStateKeySetter(setError);
  const hasError = !!(error.title || error.goal || error.dueDate || error.file || error.linkUrl);

  const { mutate: addTodoMutate } = useAddTodoMutation();

  return (
    <form
      onSubmit={(event) => handleAddTodo({ event, formState, addTodoMutate, hasError, addTodoClose })}
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
        selectedGoal={formState.selectedGoal}
        setSelectedGoal={setFormStateByKey("selectedGoal")}
      />
      <DateInput
        selectedDate={formState.selectedDate}
        setSelectedDate={setFormStateByKey("selectedDate")}
        error={error.dueDate}
        setError={setErrorByKey("dueDate")}
      />
      <UploadInput
        error={error.file}
        label="파일"
        file={formState.file}
        onFileChange={setFormStateByKey("file")}
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
        // isConfirmDisabled={hasError}
      />
    </form>
  );
}
