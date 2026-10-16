import { NOTES_API_PATH } from "@/constants/apiEndpoints";
import NOTE_QUERY_KEYS from "@/constants/queryKeys/note";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { NoteResponse, PatchNoteRequest, PostNoteRequest } from "@/types/notes.types";
import { mutationOptions, type QueryClient } from "@tanstack/react-query";

export const noteMutationOptions = {
  create: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: async (newNote: PostNoteRequest) => {
        const response = await clientFetcher.post<NoteResponse>(NOTES_API_PATH.base, newNote);

        return response.data;
      },
      onSuccess: async (note) => {
        queryClient.setQueryData(NOTE_QUERY_KEYS.detail(note.id), note);
        await queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.lists() });
      },
    }),
  update: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: async ({ noteId, body }: { noteId: number; body: PatchNoteRequest }) => {
        const response = await clientFetcher.patch<NoteResponse>(NOTES_API_PATH.detail(noteId), body);

        return response.data;
      },
      onSuccess: async (note) => {
        queryClient.setQueryData(NOTE_QUERY_KEYS.detail(note.id), note);
        await queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.lists() });
      },
    }),
  remove: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: async (noteId: number) => {
        await clientFetcher.delete(NOTES_API_PATH.detail(noteId));

        return noteId;
      },
      onSuccess: async (noteId) => {
        queryClient.removeQueries({ queryKey: NOTE_QUERY_KEYS.detail(noteId), exact: true });
        await queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.lists() });
      },
    }),
};
