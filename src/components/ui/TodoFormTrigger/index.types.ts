import type { PatchTodoRequest, PostTodoRequest, TodoGoalSummary, TodoResponse } from "@/types/todos.types";
import type { UseMutateFunction } from "@tanstack/react-query";

export type FormState = {
  selectedGoal: TodoGoalSummary | null;
  selectedDate: Date | null;
  file: File | null;
};

export type TodoFormErrorMassage = {
  title: string;
  goal: string;
  dueDate: string;
  file: string;
  linkUrl: string;
};

export type HandleTodoSubmitParams<TData, TError> = {
  event: React.SubmitEvent<HTMLFormElement>;
  formState: FormState;
  mutate: UseMutateFunction<TData, TError, PatchTodoRequest | PostTodoRequest>;
  setErrorByKey: <K extends keyof TodoFormErrorMassage>(
    key: K,
  ) => React.Dispatch<React.SetStateAction<TodoFormErrorMassage[K]>>;
  todoFormClose: () => void;
  todo?: TodoResponse;
};
