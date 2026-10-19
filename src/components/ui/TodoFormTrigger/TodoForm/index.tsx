"use client";

import { handleTodoSubmit } from "../index.services";
import type { TodoFormErrorMassage, FormState } from "../index.types";
import { validateLinkUrl, validateTitle } from "../index.utils";
import DateInput from "./DateInput";
import StatusInput from "./StatusInput";
import ModalActions from "@/components/ui/Modal/ModalActions";
import SelectGoalDropdown from "@/components/ui/SelectGoalDropdown";
import TextInput from "@/components/ui/TextInput";
import UploadInput from "@/components/ui/UploadInput";
import { useSaveTodoMutation } from "@/hooks/mutations/todo/useTodoMutations";
import type { GoalListItem } from "@/types/goals.types";
import type { TodoResponse } from "@/types/todos.types";
import { createStateKeySetter } from "@/utils/stateUtills";
import { useRef, useState } from "react";

interface TodoFormProps {
  todoFormClose: () => void;
  aleadySelectedGoal?: GoalListItem;
  aleadySelectedDate?: Date;
  todo?: TodoResponse;
}

export default function TodoForm({ todoFormClose, aleadySelectedGoal, aleadySelectedDate, todo }: TodoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>({
    file: null,
    selectedGoal: todo?.goal ?? aleadySelectedGoal ?? null,
    selectedDate: todo?.dueDate ? new Date(todo.dueDate) : (aleadySelectedDate ?? null),
    isDone: todo?.done ?? false,
  });
  const setFormStateByKey = createStateKeySetter(setFormState);

  const [error, setError] = useState<TodoFormErrorMassage>({ title: "", goal: "", dueDate: "", file: "", linkUrl: "" });
  const setErrorByKey = createStateKeySetter(setError);

  const { mutate } = useSaveTodoMutation(todo?.id);

  return (
    <form
      className="mt-16 flex h-full flex-col gap-12 md:mt-32 md:gap-16"
      onSubmit={(event) => handleTodoSubmit({ event, formState, setErrorByKey, mutate, todoFormClose, todo })}
      ref={formRef}
    >
      {todo && (
        <StatusInput
          isDone={formState.isDone}
          setIsDone={setFormStateByKey("isDone")}
        />
      )}
      <TextInput
        onBlur={(e) => validateTitle(e.target.value, setErrorByKey("title"))}
        error={error.title}
        name="title"
        label="제목 *"
        placeholder="할 일의 제목을 적어주세요"
        defaultValue={todo?.title}
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
        placeholder={todo?.fileUrl ?? "파일을 업로드해주세요"}
      />
      <TextInput
        onBlur={(e) => validateLinkUrl(e.target.value, setErrorByKey("linkUrl"))}
        error={error.linkUrl}
        name="linkUrl"
        label="링크"
        placeholder="링크를 업로드해 주세요"
        defaultValue={todo?.linkUrl ?? undefined}
      />
      <ModalActions
        onClose={todoFormClose}
        confirmButtonType="submit"
      />
    </form>
  );
}
