import type { JSONContent } from "@tiptap/react";

export const createEmptyNoteContent = (): JSONContent => ({
  type: "doc",
  content: [{ type: "paragraph" }],
});

export const getLinkUrlError = (value: string) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return "";

  try {
    const url = new URL(trimmedValue);
    if (url.protocol === "http:" || url.protocol === "https:") return "";
  } catch {
    // URL 생성에 실패하면 아래의 공통 오류 메시지를 반환한다.
  }

  return "http:// 또는 https://로 시작하는 올바른 링크를 입력해 주세요.";
};

export const hasEmbeddedDataImage = (node: JSONContent): boolean => {
  if (node.type === "image" && typeof node.attrs?.src === "string" && node.attrs.src.startsWith("data:")) {
    return true;
  }

  return node.content?.some(hasEmbeddedDataImage) ?? false;
};

const formatNoteDate = (date: Date) =>
  `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`;

export const formatCreatedAt = (value: Date | string) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return typeof value === "string" ? value : "";

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return `${formatNoteDate(date)} (${weekdays[date.getDay()]}) ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
};
