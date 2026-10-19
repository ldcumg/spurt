import { shouldRetryNoteQuery } from "@/app/(main)/notes/noteApiError";
import { NOTES_API_PATH } from "@/constants/apiEndpoints";
import NOTE_QUERY_KEYS, { type NoteListQueryParams } from "@/constants/queryKeys/note";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { NoteListResponse, NoteResponse } from "@/types/notes.types";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const noteQueryOptions = {
  list: (params: NoteListQueryParams) =>
    infiniteQueryOptions({
      queryKey: NOTE_QUERY_KEYS.list(params),
      queryFn: async ({ pageParam, signal }) => {
        const response = await clientFetcher.get<NoteListResponse>(NOTES_API_PATH.base, {
          params: {
            ...params,
            cursor: pageParam ?? undefined,
          },
          signal,
        });

        return response.data;
      },
      initialPageParam: null as number | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      retry: shouldRetryNoteQuery,
    }),
  detail: (noteId: number) =>
    queryOptions({
      queryKey: NOTE_QUERY_KEYS.detail(noteId),
      queryFn: async ({ signal }) => {
        const response = await clientFetcher.get<NoteResponse>(NOTES_API_PATH.detail(noteId), { signal });

        return response.data;
      },
      retry: shouldRetryNoteQuery,
    }),
};
