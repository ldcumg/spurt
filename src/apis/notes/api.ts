import { NOTES_API_PATH } from "@/constants/apiEndpoints";
import { serverFetcher } from "@/lib/axios/serverFetcher";
import {
  GetNoteListParams,
  NoteResponse,
  NoteListResponse,
  PatchNoteRequest,
  PostNoteRequest,
} from "@/types/notes.types";

export const getNoteList = (params?: GetNoteListParams) =>
  serverFetcher<NoteListResponse>(NOTES_API_PATH.base, { params });

export const postNote = (body: PostNoteRequest) =>
  serverFetcher<NoteResponse>(NOTES_API_PATH.base, { method: "POST", data: body });

export const getNoteDetail = (noteId: number) => serverFetcher<NoteResponse>(NOTES_API_PATH.detail(noteId));

export const patchNote = (noteId: number, body: PatchNoteRequest) =>
  serverFetcher<NoteResponse>(NOTES_API_PATH.detail(noteId), { method: "PATCH", data: body });

export const deleteNote = (noteId: number) => serverFetcher(NOTES_API_PATH.detail(noteId), { method: "DELETE" });
