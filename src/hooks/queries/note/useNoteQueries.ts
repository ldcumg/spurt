import { noteQueryOptions } from ".";
import type { NoteListQueryParams } from "@/constants/queryKeys/note";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

/** 커서 기반으로 노트 목록을 조회한다. */
export const useNoteListQuery = (params: NoteListQueryParams) => {
  return useInfiniteQuery(noteQueryOptions.list(params));
};

/** 선택한 노트의 상세 정보를 조회한다. */
export const useNoteDetailQuery = (noteId: number, enabled = true) => {
  return useQuery({
    ...noteQueryOptions.detail(noteId),
    enabled,
  });
};
