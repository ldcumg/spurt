import { NOTES_API_PATH } from "@/constants/apiEndpoints";
import NOTE_QUERY_KEYS, { type NoteListQueryParams } from "@/constants/queryKeys/note";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { NoteListResponse } from "@/types/notes.types";
import { infiniteQueryOptions } from "@tanstack/react-query";

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
    }),
};
