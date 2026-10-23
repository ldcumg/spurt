import { createNotesApi } from "@/apis/notes/api";
import { serverFetcher } from "@/lib/axios/serverFetcher";

export const { getNoteList, postNote, getNoteDetail, patchNote, deleteNote } = createNotesApi(serverFetcher);
