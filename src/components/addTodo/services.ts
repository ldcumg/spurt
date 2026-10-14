import type { AddTodoErrorMassage, FormState } from "./types";
import { validateGoal, validateTitle } from "./utils";
import { postFileUploadUrl } from "@/apis/uploads";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PostTodoRequest } from "@/types/todos.types";
import type { UseMutateFunction } from "@tanstack/react-query";

export type HandleAddTodoParams<TData, TError> = {
  event: React.SubmitEvent<HTMLFormElement>;
  formState: FormState;
  addTodoMutate: UseMutateFunction<TData, TError, PostTodoRequest>;
  setErrorByKey: <K extends keyof AddTodoErrorMassage>(
    key: K,
  ) => React.Dispatch<React.SetStateAction<AddTodoErrorMassage[K]>>;
  addTodoClose: () => void;
};

export const handleAddTodo = async <TData, TError>({
  event,
  formState,
  addTodoMutate,
  setErrorByKey,
  addTodoClose,
}: HandleAddTodoParams<TData, TError>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const title = formData.get("title") as string;
  const selectedGoal = formState.selectedGoal;
  const selectedDate = formState.selectedDate;
  const file = formState.file;
  const linkUrl = formData.get("linkUrl");

  if (validateTitle(title, setErrorByKey("title"))) return;
  if (validateGoal(selectedGoal, setErrorByKey("goal")) || !selectedGoal) return;

  const newTodo: PostTodoRequest = {
    title,
    goalId: selectedGoal.id,
  };

  // 마감 날짜 선택 시 마감 날짜 추가
  if (selectedDate) {
    newTodo.dueDate = selectedDate.toISOString();
  }

  // 파일 선택 시 파일 url 추가
  if (file) {
    try {
      const {
        data: { uploadUrl, url },
      } = await postFileUploadUrl({
        fileName: file.name,
      });

      await clientFetcher.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      newTodo.fileUrl = url;
    } catch (error) {
      console.error(error);
      alert("파일 업로드 실패");
    }
  }

  if (linkUrl) {
    newTodo.linkUrl = linkUrl as string;
  }

  addTodoMutate(newTodo, {
    onSuccess: () => {
      alert("할 일이 추가되었습니다.");
      addTodoClose();
    },
    onError: (error) => {
      console.error(error);
      alert("오류가 발생했습니다.");
    },
  });
};
