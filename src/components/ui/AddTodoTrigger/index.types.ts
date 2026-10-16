import type { GoalListItem } from "@/types/goals.types";
import type { PostTodoRequest } from "@/types/todos.types";
import type { UseMutateFunction } from "@tanstack/react-query";

export type FormState = {
  selectedGoal: GoalListItem | null;
  selectedDate: Date | null;
  file: File | null;
};

export type AddTodoErrorMassage = {
  title: string;
  goal: string;
  dueDate: string;
  file: string;
  linkUrl: string;
};

export type HandleAddTodoParams<TData, TError> = {
  event: React.SubmitEvent<HTMLFormElement>;
  formState: FormState;
  addTodoMutate: UseMutateFunction<TData, TError, PostTodoRequest>;
  setErrorByKey: <K extends keyof AddTodoErrorMassage>(
    key: K,
  ) => React.Dispatch<React.SetStateAction<AddTodoErrorMassage[K]>>;
  addTodoClose: () => void;
};
