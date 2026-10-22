"use client";

import { handleAddTodo } from "../index.services";
import type { AddTodoErrorMassage, FormState } from "../index.types";
import { validateLinkUrl, validateTitle } from "../index.utils";
import DateInput from "./DateInput";
import ModalActions from "@/components/ui/Modal/ModalActions";
import SelectGoalDropdown from "@/components/ui/SelectGoalDropdown";
import TextInput from "@/components/ui/TextInput";
import UploadInput from "@/components/ui/UploadInput";
import { useAddTodoMutation } from "@/hooks/mutations/todo/useTodoMutations";
import type { GoalListItem } from "@/types/goals.types";
import { createStateKeySetter } from "@/utils/stateUtills";
import { useRef, useState } from "react";

interface AddTodoFormProps {
  addTodoClose: () => void;
  aleadySelectedGoal?: GoalListItem;
  aleadySelectedDate?: Date;
}

export default function AddTodoForm({ addTodoClose, aleadySelectedGoal, aleadySelectedDate }: AddTodoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>({
    file: null,
    selectedGoal: aleadySelectedGoal ?? null,
    selectedDate: aleadySelectedDate ?? null,
  });
  const setFormStateByKey = createStateKeySetter(setFormState);

  const [error, setError] = useState<AddTodoErrorMassage>({ title: "", goal: "", dueDate: "", file: "", linkUrl: "" });
  const setErrorByKey = createStateKeySetter(setError);

  const { mutate: addTodoMutate } = useAddTodoMutation();

  return (
    <form
      className="mt-16 flex h-full flex-col gap-12 md:mt-32 md:gap-16"
      onSubmit={(event) => handleAddTodo({ event, formState, addTodoMutate, setErrorByKey, addTodoClose })}
      ref={formRef}
    >
      <TextInput
        onBlur={(e) => validateTitle(e.target.value, setErrorByKey("title"))}
        error={error.title}
        name="title"
        label="제목 *"
        placeholder="할 일의 제목을 적어주세요"
      />
      <SelectGoalDropdown
        error={error.goal}
        setError={setErrorByKey("goal")}
        label="목표 *"
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
        onBlur={(e) => validateLinkUrl(e.target.value, setErrorByKey("linkUrl"))}
        error={error.linkUrl}
        name="linkUrl"
        label="링크"
        placeholder="링크를 업로드해 주세요"
      />
      <ModalActions onClose={addTodoClose} />
    </form>
  );
}
