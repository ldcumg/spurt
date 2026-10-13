import { noteQueryOptions } from ".";
import type { NoteListQueryParams } from "@/constants/queryKeys/note";
import { useInfiniteQuery } from "@tanstack/react-query";

/** 커서 기반으로 노트 목록을 조회한다. */
export const useNoteListQuery = (params: NoteListQueryParams) => {
  return useInfiniteQuery(noteQueryOptions.list(params));
};
