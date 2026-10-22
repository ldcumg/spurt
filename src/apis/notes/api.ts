import { NOTES_API_PATH } from "@/constants/apiEndpoints";
import type { Fetcher } from "@/types/api/fetcher.types";
import {
  GetNoteListParams,
  NoteResponse,
  NoteListResponse,
  PatchNoteRequest,
  PostNoteRequest,
} from "@/types/notes.types";

export const createNotesApi = (fetcher: Fetcher) => ({
  getNoteList: (params?: GetNoteListParams) => fetcher<NoteListResponse>(NOTES_API_PATH.base, { params }),

  postNote: (body: PostNoteRequest) => fetcher<NoteResponse>(NOTES_API_PATH.base, { method: "POST", data: body }),

  getNoteDetail: (noteId: number) => fetcher<NoteResponse>(NOTES_API_PATH.detail(noteId)),

  patchNote: (noteId: number, body: PatchNoteRequest) =>
    fetcher<NoteResponse>(NOTES_API_PATH.detail(noteId), { method: "PATCH", data: body }),

  deleteNote: (noteId: number) => fetcher(NOTES_API_PATH.detail(noteId), { method: "DELETE" }),
});
