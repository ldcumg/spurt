import type { JSONContent } from "@tiptap/react";

export const NOTE_DRAFT_VERSION = 1 as const;

const NOTE_DRAFT_STORAGE_KEY_PREFIX = `spurt:note-draft:v${NOTE_DRAFT_VERSION}`;

export type NoteDraftOwner = {
  teamId: string;
  userId: number;
};

export type NoteDraft = NoteDraftOwner & {
  version: typeof NOTE_DRAFT_VERSION;
  title: string;
  content: JSONContent;
  linkUrl: string;
  goalId: number | null;
  todoId: number | null;
  savedAt: string;
};

type NoteDraftStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export type NoteDraftStorageErrorKind = "quotaExceeded" | "unavailable" | "unknown";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const getNoteDraftStorageErrorKind = (error: unknown): NoteDraftStorageErrorKind => {
  if (!isRecord(error)) return "unknown";

  const errorName = typeof error.name === "string" ? error.name : "";
  const errorCode = typeof error.code === "number" ? error.code : null;

  if (errorName === "QuotaExceededError" || errorName === "NS_ERROR_DOM_QUOTA_REACHED" || errorCode === 22) {
    return "quotaExceeded";
  }

  if (
    errorName === "SecurityError" ||
    errorName === "InvalidStateError" ||
    errorName === "NotSupportedError" ||
    errorCode === 18
  ) {
    return "unavailable";
  }

  return "unknown";
};

const isPositiveIntegerOrNull = (value: unknown): value is number | null =>
  value === null || (Number.isSafeInteger(value) && Number(value) > 0);

const isNoteDraft = (value: unknown): value is NoteDraft => {
  if (!isRecord(value)) return false;

  return (
    value.version === NOTE_DRAFT_VERSION &&
    typeof value.teamId === "string" &&
    value.teamId.length > 0 &&
    Number.isSafeInteger(value.userId) &&
    Number(value.userId) > 0 &&
    typeof value.title === "string" &&
    isRecord(value.content) &&
    typeof value.linkUrl === "string" &&
    isPositiveIntegerOrNull(value.goalId) &&
    isPositiveIntegerOrNull(value.todoId) &&
    typeof value.savedAt === "string" &&
    !Number.isNaN(Date.parse(value.savedAt))
  );
};

const getBrowserStorage = (storage?: NoteDraftStorage) => {
  if (storage) return storage;
  if (typeof window === "undefined") return null;

  return window.localStorage;
};

export const getNoteDraftStorageKey = ({ teamId, userId }: NoteDraftOwner) =>
  `${NOTE_DRAFT_STORAGE_KEY_PREFIX}:${encodeURIComponent(teamId)}:${userId}`;

export const readNoteDraft = (owner: NoteDraftOwner, storage?: NoteDraftStorage): NoteDraft | null => {
  const targetStorage = getBrowserStorage(storage);
  if (!targetStorage) return null;

  const storedValue = targetStorage.getItem(getNoteDraftStorageKey(owner));
  if (!storedValue) return null;

  try {
    const draft: unknown = JSON.parse(storedValue);

    if (!isNoteDraft(draft) || draft.teamId !== owner.teamId || draft.userId !== owner.userId) return null;

    return draft;
  } catch {
    return null;
  }
};

export const saveNoteDraft = (draft: NoteDraft, storage?: NoteDraftStorage) => {
  const targetStorage = getBrowserStorage(storage);
  if (!targetStorage) return false;

  targetStorage.setItem(getNoteDraftStorageKey(draft), JSON.stringify(draft));
  return true;
};

export const removeNoteDraft = (owner: NoteDraftOwner, storage?: NoteDraftStorage) => {
  const targetStorage = getBrowserStorage(storage);
  if (!targetStorage) return false;

  targetStorage.removeItem(getNoteDraftStorageKey(owner));
  return true;
};
