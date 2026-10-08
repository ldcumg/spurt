import { formatDate } from "../calendar/utils";
import type { FormState } from "./types";
import { postFileUploadUrl } from "@/apis/uploads";
import type { PostTodoRequest } from "@/types/todos.types";
import type { UseMutateFunction } from "@tanstack/react-query";

export type HandleAddTodoParams<TData, TError> = {
  event: React.SubmitEvent<HTMLFormElement>;
  formState: FormState;
  addTodoMutate: UseMutateFunction<TData, TError, PostTodoRequest>;
  hasError: boolean;
  addTodoClose: () => void;
};

export const handleAddTodo = async <TData, TError>({
  event,
  formState,
  addTodoMutate,
  hasError,
  addTodoClose,
}: HandleAddTodoParams<TData, TError>) => {
  event.preventDefault();

  console.log("[ ㏒ ] hasError =>", hasError);
  // if (hasError) return;

  const formData = new FormData(event.currentTarget);
  const selectedGoal = formState.selectedGoal;
  const selectedDate = formState.selectedDate;
  const file = formState.file;
  const linkUrl = formData.get("linkUrl");

  const newTodo: PostTodoRequest = {
    title: formData.get("title") as string,
  };

  // 목표 선택 시 목표 id 추가
  if (selectedGoal) {
    newTodo.goalId = selectedGoal.id;
  }

  // 마감 날짜 선택 시 마감 날짜 추가
  if (selectedDate) {
    newTodo.dueDate = formatDate(selectedDate);
  }

  // 파일 선택 시 파일 url 추가
  if (file) {
    const {
      data: { url },
    } = await postFileUploadUrl({
      fileName: file.name,
    });
    newTodo.fileUrl = url;
  }

  if (linkUrl) {
    newTodo.linkUrl = linkUrl as string;
  }

  addTodoMutate(newTodo, {
    onSuccess: (data) => {
      console.log(data);
      alert("할 일이 추가되었습니다.");
      addTodoClose();
    },
    onError: (error) => {
      console.error(error);
      alert("오류가 발생했습니다.");
    },
  });
};
