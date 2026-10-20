"use client";

import { resolveDraftSelection, type DraftSelectionStatus } from "../noteDraftSelection";
import {
  NOTE_DRAFT_VERSION,
  getNoteDraftStorageErrorKind,
  readNoteDraft,
  removeNoteDraft,
  saveNoteDraft,
  type NoteDraft,
} from "../noteDraftStorage";
import type { DropDownOption } from "@/components/ui/Dropdown";
import type { TodoResponse } from "@/types/todos.types";
import type { UserResponse } from "@/types/users.types";
import type { JSONContent } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";

interface UseNoteDraftParams {
  user: UserResponse | undefined;
  isUserPending: boolean;
  goals: DropDownOption[];
  todos: TodoResponse[];
}

interface SaveDraftParams {
  title: string;
  content: JSONContent;
  linkUrl: string;
  goalId: string;
  todoId: string;
}

interface RestoredNoteDraft {
  title: string;
  content: JSONContent;
  linkUrl: string;
  goalId: string;
  todoId: string;
}

const getDraftRestoreMessage = (status: DraftSelectionStatus, hasGoals: boolean) => {
  switch (status) {
    case "goalRequired":
      return hasGoals
        ? "임시저장한 내용을 불러왔어요. 기본 목표를 선택했으니 할 일을 선택해 주세요."
        : "임시저장한 내용을 불러왔어요. 목표를 추가하고 할 일을 선택해 주세요.";
    case "goalUnavailable":
      return hasGoals
        ? "임시저장한 내용을 불러왔지만 저장된 목표를 찾지 못했어요. 기본 목표의 할 일을 다시 선택해 주세요."
        : "임시저장한 내용을 불러왔지만 저장된 목표를 찾지 못했어요. 목표를 추가하고 할 일을 선택해 주세요.";
    case "todoRequired":
      return "임시저장한 내용을 불러왔어요. 할 일을 선택해 주세요.";
    case "todoUnavailable":
      return "임시저장한 내용을 불러왔지만 저장된 할 일을 찾지 못했어요. 할 일을 다시 선택해 주세요.";
    default:
      return "임시저장한 노트를 불러왔어요.";
  }
};

const getDraftStorageErrorMessage = (error: unknown, operation: "read" | "save") => {
  const errorKind = getNoteDraftStorageErrorKind(error);

  if (errorKind === "quotaExceeded") {
    return "브라우저 임시저장 공간이 부족해요. 이미지 수나 크기를 줄인 뒤 다시 시도해 주세요.";
  }

  if (errorKind === "unavailable") {
    return operation === "save"
      ? "브라우저 설정 때문에 임시저장할 수 없어요. 이 사이트의 저장 권한을 확인해 주세요."
      : "브라우저 설정 때문에 임시저장한 노트를 확인할 수 없어요. 이 사이트의 저장 권한을 확인해 주세요.";
  }

  return operation === "save"
    ? "임시저장하지 못했어요. 잠시 후 다시 시도해 주세요."
    : "임시저장한 노트를 확인하지 못했어요. 잠시 후 다시 시도해 주세요.";
};

const toDraftId = (value: string) => {
  const id = Number(value);

  return Number.isSafeInteger(id) && id > 0 ? id : null;
};

export const useNoteDraft = ({ user, isUserPending, goals, todos }: UseNoteDraftParams) => {
  const [draftToRestore, setDraftToRestore] = useState<NoteDraft | null>(null);
  const [isRestoreOpen, setIsRestoreOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusError, setIsStatusError] = useState(false);
  const checkedOwnerRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const ownerKey = `${user.teamId}:${user.id}`;
    if (checkedOwnerRef.current === ownerKey) return;

    let isCancelled = false;
    queueMicrotask(() => {
      if (isCancelled || checkedOwnerRef.current === ownerKey) return;
      checkedOwnerRef.current = ownerKey;

      try {
        const draft = readNoteDraft({ teamId: user.teamId, userId: user.id });
        if (!draft) return;

        setDraftToRestore(draft);
        setIsRestoreOpen(true);
      } catch (error) {
        setStatusMessage(getDraftStorageErrorMessage(error, "read"));
        setIsStatusError(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [user]);

  const clearStatus = () => {
    setStatusMessage("");
    setIsStatusError(false);
  };

  const saveDraft = ({ title, content, linkUrl, goalId, todoId }: SaveDraftParams) => {
    clearStatus();

    if (!user) {
      setStatusMessage(
        isUserPending
          ? "사용자 정보를 확인하는 중이에요. 잠시 후 다시 시도해 주세요."
          : "사용자 정보를 확인하지 못해 임시저장할 수 없어요. 다시 로그인해 주세요.",
      );
      setIsStatusError(true);
      return;
    }

    try {
      const isSaved = saveNoteDraft({
        version: NOTE_DRAFT_VERSION,
        teamId: user.teamId,
        userId: user.id,
        title,
        content,
        linkUrl,
        goalId: toDraftId(goalId),
        todoId: toDraftId(todoId),
        savedAt: new Date().toISOString(),
      });

      if (!isSaved) throw new Error("Local storage is unavailable");

      setStatusMessage("작성 중인 노트를 임시저장했어요.");
      setIsStatusError(false);
    } catch (error) {
      setStatusMessage(getDraftStorageErrorMessage(error, "save"));
      setIsStatusError(true);
    }
  };

  const skipRestore = () => {
    setIsRestoreOpen(false);
    setDraftToRestore(null);
  };

  const restoreDraft = (): RestoredNoteDraft | null => {
    if (!draftToRestore) return null;

    const restoredSelection = resolveDraftSelection(draftToRestore, goals, todos);
    const restoredDraft = {
      title: draftToRestore.title,
      content: draftToRestore.content,
      linkUrl: draftToRestore.linkUrl,
      goalId: restoredSelection.goalId,
      todoId: restoredSelection.todoId,
    };

    setStatusMessage(getDraftRestoreMessage(restoredSelection.status, goals.length > 0));
    setIsStatusError(false);
    setIsRestoreOpen(false);
    setDraftToRestore(null);

    return restoredDraft;
  };

  const removeDraft = () => {
    if (!user) return;

    try {
      removeNoteDraft({ teamId: user.teamId, userId: user.id });
    } catch {
      // 노트 생성은 끝났으므로 임시저장 정리 실패를 생성 실패로 처리하지 않는다.
    }
  };

  return {
    draftToRestore,
    isRestoreOpen,
    statusMessage,
    isStatusError,
    clearStatus,
    saveDraft,
    skipRestore,
    restoreDraft,
    removeDraft,
  };
};
