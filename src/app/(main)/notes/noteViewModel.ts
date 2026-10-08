import type { NoteResponse } from "@/types/notes.types";
import type { JSONContent } from "@tiptap/react";

export type NoteTone = "mint" | "coral" | "blue" | "yellow";

export interface NoteViewModel {
  id: number;
  title: string;
  description: string;
  goal: string | null;
  task: string;
  date: string;
  tone: NoteTone;
  content: JSONContent | null;
  linkUrl: string | null;
}

const NOTE_TONES: NoteTone[] = ["mint", "coral", "blue", "yellow"];

const extractPlainText = (content: JSONContent): string => {
  if (typeof content.text === "string") return content.text;
  return content.content?.map(extractPlainText).join(" ") ?? "";
};

const formatNoteDate = (createdAt: string) => {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return createdAt;

  const parts = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  }).formatToParts(date);
  const valueByType = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return `${valueByType.year}. ${valueByType.month}. ${valueByType.day}`;
};

const getNoteTone = (noteId: number) => NOTE_TONES[Math.abs(noteId - 1) % NOTE_TONES.length];

export const toNoteViewModel = (note: NoteResponse): NoteViewModel => {
  const content = note.content as JSONContent | null | undefined;
  const description = content ? extractPlainText(content).replace(/\s+/g, " ").trim() : "";

  return {
    id: note.id,
    title: note.title,
    description: description || "작성된 내용이 없습니다.",
    goal: note.todo.goal?.title ?? null,
    task: note.todo.title,
    date: formatNoteDate(note.createdAt),
    tone: getNoteTone(note.id),
    content: content ?? null,
    linkUrl: note.linkUrl,
  };
};
