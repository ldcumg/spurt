import type { GetNoteListParams } from "@/types/notes.types";

export type NoteListQueryParams = Omit<GetNoteListParams, "cursor">;

const NOTE_QUERY_KEYS = {
  all: ["notes"] as const,
  lists: () => [...NOTE_QUERY_KEYS.all, "list"] as const,
  list: (params: NoteListQueryParams) => [...NOTE_QUERY_KEYS.lists(), params] as const,
  detail: (noteId: string | number) => [...NOTE_QUERY_KEYS.all, "detail", noteId] as const,
};

export default NOTE_QUERY_KEYS;
