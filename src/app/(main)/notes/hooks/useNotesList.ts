"use client";

import type { SortOrder } from "../components/NotesToolbar";
import { getNoteApiError } from "../noteApiError";
import { toNoteViewModel } from "../noteViewModel";
import { getNoteTodoGoalLabel, useNoteTodoGoals } from "../useNoteTodoGoals";
import { useNoteListQuery } from "@/hooks/queries/note/useNoteQueries";
import { useMemo, useState } from "react";

const NOTES_PAGE_SIZE = 6;

/** 노트 목록의 검색, 정렬, 페이지네이션과 화면 모델 변환을 관리한다. */
export const useNotesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");
  const normalizedSearchTerm = searchTerm.trim();
  const queryParams = useMemo(
    () => ({
      limit: NOTES_PAGE_SIZE,
      sort: sortOrder === "recent" ? ("latest" as const) : ("oldest" as const),
      ...(normalizedSearchTerm ? { search: normalizedSearchTerm } : {}),
    }),
    [normalizedSearchTerm, sortOrder],
  );
  const query = useNoteListQuery(queryParams);
  const noteResponses = useMemo(() => query.data?.pages.flatMap((page) => page.notes) ?? [], [query.data]);
  const todoIds = useMemo(() => noteResponses.map((note) => note.todoId), [noteResponses]);
  const todoGoalStateById = useNoteTodoGoals(todoIds);
  const notes = useMemo(
    () => noteResponses.map((note) => toNoteViewModel(note, getNoteTodoGoalLabel(todoGoalStateById.get(note.todoId)))),
    [noteResponses, todoGoalStateById],
  );
  const errorInfo = getNoteApiError(query.error, "list");

  const loadMore = () => {
    void query.fetchNextPage();
  };

  const retry = () => {
    void query.refetch();
  };

  return {
    searchTerm,
    sortOrder,
    notes,
    hasSearchTerm: Boolean(normalizedSearchTerm),
    isLoading: query.isPending,
    hasInitialLoadError: query.isError && !query.data,
    errorInfo,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isFetchNextPageError: query.isFetchNextPageError,
    setSearchTerm,
    setSortOrder,
    loadMore,
    retry,
  };
};
