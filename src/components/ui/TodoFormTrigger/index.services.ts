import type { HandleTodoSubmitParams } from "./index.types";
import { validateDueDate, validateGoal, validateLinkUrl, validateTitle } from "./index.utils";
import { UPLOADS_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PatchTodoRequest, PostTodoRequest } from "@/types/todos.types";
import type { UploadUrlResponse } from "@/types/uploads.types";

/** S3에 파일 업로드 */
export const uploadFile = async (file: File) => {
  const {
    data: { uploadUrl, url },
  } = await clientFetcher.post<UploadUrlResponse>(UPLOADS_API_PATH.files, {
    fileName: file.name,
  });

  await clientFetcher.put(uploadUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  return url;
};

/** 할 일 수정 또는 생성 */
export const handleTodoSubmit = async <TData, TError>({
  event,
  formState,
  setErrorByKey,
  mutate,
  todoFormClose,
  todo,
}: HandleTodoSubmitParams<TData, TError>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const title = formData.get("title") as string;
  const selectedGoal = formState.selectedGoal;
  const selectedDate = formState.selectedDate;
  const file = formState.file;
  const linkUrl = (formData.get("linkUrl") as string) ?? "";

  if (validateTitle(title, setErrorByKey("title"))) return;
  if (validateGoal(selectedGoal, setErrorByKey("goal")) || !selectedGoal) return;
  if (validateDueDate(selectedDate, setErrorByKey("dueDate"))) return;
  if (validateLinkUrl(linkUrl, setErrorByKey("linkUrl"))) return;

  let todoData: PostTodoRequest | PatchTodoRequest;

  const isEdit = !!todo;

  if (isEdit) {
    const editData: PatchTodoRequest = {};

    // 제목 수정 시 제목 반영
    if (todo.title !== title) editData.title = title;

    // 목표 수정 시 목표 반영
    if (todo.goalId !== selectedGoal.id) editData.goalId = selectedGoal.id;

    // 마감 날짜 수정 시 반영
    const dueDate = selectedDate?.toISOString() ?? null;
    if (todo.dueDate !== dueDate) {
      editData.dueDate = dueDate;
    }

    // 링크 수정 시 반영
    if (linkUrl && todo.linkUrl !== linkUrl) editData.linkUrl = linkUrl;

    todoData = editData;
  } else {
    const newData: PostTodoRequest = {
      title,
      goalId: selectedGoal.id,
    };

    // 마감 날짜 선택 시 마감 날짜 추가
    if (selectedDate) newData.dueDate = selectedDate.toISOString();

    // 링크 선택 시 링크 url 추가
    if (linkUrl) newData.linkUrl = linkUrl;

    todoData = newData;
  }

  // 파일 선택 시 파일 url 추가
  if (file) {
    try {
      todoData.fileUrl = await uploadFile(file);
    } catch (error) {
      console.error(error);
      alert("파일 업로드 실패");
      return;
    }
  }

  if (Object.keys(todoData).length === 0) {
    alert("변경 사항이 없습니다.");
    return;
  }

  mutate(todoData, {
    onSuccess: () => {
      alert(`할 일이 ${isEdit ? "수정" : "추가"}되었습니다`);
      todoFormClose();
    },
    onError: (error) => {
      alert("오류가 발생했습니다.");
      console.error(error);
    },
  });
};
