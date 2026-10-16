"use client";

import { getNoteApiError, isNoteApiErrorStatus } from "../noteApiError";
import { toNoteViewModel } from "../noteViewModel";
import { getNoteTodoGoalLabel, useNoteTodoGoals } from "../useNoteTodoGoals";
import NOTE_QUERY_KEYS from "@/constants/queryKeys/note";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { useNoteDetailQuery } from "@/hooks/queries/note/useNoteQueries";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

/** 선택한 노트의 상세 조회와 상세 패널 상태를 관리한다. */
export const useNoteDetail = () => {
  const queryClient = useQueryClient();
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const { isOpen, open, close } = useDisclosure();
  const query = useNoteDetailQuery(selectedNoteId ?? 0, selectedNoteId !== null && isOpen);
  const todoIds = useMemo(() => (query.data ? [query.data.todoId] : []), [query.data]);
  const todoGoalStateById = useNoteTodoGoals(todoIds);
  const note = useMemo(
    () =>
      query.data ? toNoteViewModel(query.data, getNoteTodoGoalLabel(todoGoalStateById.get(query.data.todoId))) : null,
    [query.data, todoGoalStateById],
  );
  const hasLoadError = query.isError && !query.data;
  const isNotFound = hasLoadError && isNoteApiErrorStatus(query.error, 404);
  const errorInfo = getNoteApiError(query.error, "detail");

  const selectNote = (noteId: number) => {
    setSelectedNoteId(noteId);
    open();
  };

  const handleDeleted = useCallback(
    (noteId: number) => {
      if (selectedNoteId !== noteId) return;

      close();
      setSelectedNoteId(null);
    },
    [close, selectedNoteId],
  );

  const closeNotFound = () => {
    close();
    setSelectedNoteId(null);
    void queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.lists() });
  };

  const retry = () => {
    void query.refetch();
  };

  return {
    selectedNoteId,
    note,
    isOpen,
    isLoading: query.isPending || (hasLoadError && query.isFetching),
    isError: hasLoadError && !isNotFound && !query.isFetching,
    isNotFound: isNotFound && !query.isFetching,
    errorInfo,
    selectNote,
    close,
    closeNotFound,
    handleDeleted,
    retry,
  };
};
