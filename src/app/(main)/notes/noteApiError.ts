import { isAxiosError } from "axios";

type NoteApiErrorContext = "list" | "detail" | "connectionList" | "todoCreate" | "create" | "update" | "delete";

interface NoteApiErrorInfo {
  status: number | null;
  title: string;
  message: string;
  canRetry: boolean;
}

export const getNoteApiErrorStatus = (error: unknown) =>
  isAxiosError(error) ? (error.response?.status ?? null) : null;

export const isNoteApiErrorStatus = (error: unknown, status: number) => getNoteApiErrorStatus(error) === status;

const getDefaultTitle = (context: NoteApiErrorContext) => {
  if (context === "list") return "노트 목록을 불러오지 못했어요.";
  if (context === "detail") return "노트를 불러오지 못했어요.";
  if (context === "connectionList") return "목표와 할 일을 불러오지 못했어요.";
  if (context === "todoCreate") return "할 일을 추가하지 못했어요.";
  if (context === "create") return "노트를 등록하지 못했어요.";
  if (context === "update") return "노트를 수정하지 못했어요.";
  return "노트를 삭제하지 못했어요.";
};

export const getNoteApiError = (error: unknown, context: NoteApiErrorContext): NoteApiErrorInfo => {
  const status = getNoteApiErrorStatus(error);
  const defaultTitle = getDefaultTitle(context);

  if (status === 400) {
    const messageByContext: Record<NoteApiErrorContext, string> = {
      list: "검색어나 정렬 조건을 확인해 주세요.",
      detail: "올바르지 않은 노트 주소예요. 목록에서 다시 선택해 주세요.",
      connectionList: "목표와 할 일의 조회 조건을 확인해 주세요.",
      todoCreate: "할 일 제목과 선택한 목표를 확인해 주세요.",
      create: "제목, 할 일, 참고 링크 등 입력 내용을 확인해 주세요.",
      update: "제목과 참고 링크 등 수정한 내용을 확인해 주세요.",
      delete: "삭제할 노트 정보를 확인해 주세요.",
    };

    return { status, title: defaultTitle, message: messageByContext[context], canRetry: false };
  }

  if (status === 403) {
    const titleByContext: Record<NoteApiErrorContext, string> = {
      list: "노트 목록을 볼 권한이 없어요.",
      detail: "이 노트를 볼 권한이 없어요.",
      connectionList: "목표와 할 일을 볼 권한이 없어요.",
      todoCreate: "이 목표에 할 일을 추가할 권한이 없어요.",
      create: "선택한 할 일에 노트를 작성할 권한이 없어요.",
      update: "이 노트를 수정할 권한이 없어요.",
      delete: "이 노트를 삭제할 권한이 없어요.",
    };

    return {
      status,
      title: titleByContext[context],
      message: "로그인한 계정과 데이터의 소유권을 확인해 주세요.",
      canRetry: false,
    };
  }

  if (status === 404) {
    const titleByContext: Record<NoteApiErrorContext, string> = {
      list: "노트 목록을 찾을 수 없어요.",
      detail: "노트를 찾을 수 없어요.",
      connectionList: "목표 또는 할 일을 찾을 수 없어요.",
      todoCreate: "선택한 목표를 찾을 수 없어요.",
      create: "선택한 할 일을 찾을 수 없어요.",
      update: "수정할 노트를 찾을 수 없어요.",
      delete: "삭제할 노트를 찾을 수 없어요.",
    };
    const messageByContext: Record<NoteApiErrorContext, string> = {
      list: "페이지를 새로고침한 뒤 다시 확인해 주세요.",
      detail: "삭제되었거나 존재하지 않는 노트예요.",
      connectionList: "목표와 할 일 목록을 새로 불러와 주세요.",
      todoCreate: "목표 목록을 새로 불러온 뒤 다시 선택해 주세요.",
      create: "할 일 목록을 새로 불러왔어요. 다시 선택해 주세요.",
      update: "이미 삭제되었거나 존재하지 않는 노트예요.",
      delete: "이미 삭제된 노트예요. 목록을 새로 불러옵니다.",
    };

    return { status, title: titleByContext[context], message: messageByContext[context], canRetry: false };
  }

  if (status !== null && status >= 500) {
    return {
      status,
      title: defaultTitle,
      message: "서버에 일시적인 문제가 생겼어요. 잠시 후 다시 시도해 주세요.",
      canRetry: true,
    };
  }

  if (status === 401) {
    return {
      status,
      title: "로그인이 필요해요.",
      message: "로그인 화면으로 이동합니다.",
      canRetry: false,
    };
  }

  return {
    status,
    title: defaultTitle,
    message: "네트워크 연결을 확인한 뒤 다시 시도해 주세요.",
    canRetry: true,
  };
};

/** 4xx는 재시도하지 않고, 네트워크 및 5xx 오류만 한 번 재시도한다. */
export const shouldRetryNoteQuery = (failureCount: number, error: unknown) => {
  if (failureCount >= 1) return false;

  const status = getNoteApiErrorStatus(error);
  return status === null || status >= 500;
};
