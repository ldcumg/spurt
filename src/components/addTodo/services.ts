import { formatDate } from "../calendar/utils";
import type { FormState } from "./types";
import { postFileUploadUrl } from "@/apis/uploads";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PostTodoRequest } from "@/types/todos.types";
import type { UseMutateFunction } from "@tanstack/react-query";
import axios from "axios";

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

  if (hasError) return;

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
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        console.error(status, error);

        switch (status) {
          case 400:
            console.error("잘못된 요청");
            alert("잘못된 요청입니다.");
            break;

          case 403:
            console.error("업로드 권한이 없거나 URL이 만료됨");
            alert("업로드 권한이 없거나 URL이 만료되었습니다.");
            break;

          case 413:
            console.error("파일 크기 초과");
            alert("파일 크기가 초과되었습니다.");
            break;

          case 500:
            console.error("서버 오류");
            alert("서버 오류가 발생했습니다.");
            break;

          default:
            console.error("파일 업로드 실패");
        }
      } else {
        console.error("알 수 없는 오류", error);
      }
    }
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
