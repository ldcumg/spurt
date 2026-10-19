"use client";

import { getNoteApiError, isNoteApiErrorStatus } from "../noteApiError";
import type { NoteViewModel } from "../noteViewModel";
import NOTE_QUERY_KEYS from "@/constants/queryKeys/note";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { useDeleteNoteMutation } from "@/hooks/mutations/note/useNoteMutations";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface UseNoteDeleteParams {
  onDeleted: (noteId: number) => void;
}

/** 삭제 대상과 확인 모달, 삭제 요청 및 404 복구 흐름을 관리한다. */
export const useNoteDelete = ({ onDeleted }: UseNoteDeleteParams) => {
  const queryClient = useQueryClient();
  const mutation = useDeleteNoteMutation();
  const [candidate, setCandidate] = useState<NoteViewModel | null>(null);
  const { isOpen, open, close } = useDisclosure();
  const errorInfo = getNoteApiError(mutation.error, "delete");

  const requestDelete = (note: NoteViewModel) => {
    mutation.reset();
    setCandidate(note);
    open();
  };

  const closeDialog = () => {
    if (mutation.isPending) return;

    close();
    setCandidate(null);
    mutation.reset();
  };

  const finishDelete = (noteId: number) => {
    onDeleted(noteId);
    close();
    setCandidate(null);
  };

  const confirmDelete = async () => {
    if (!candidate || mutation.isPending) return;

    try {
      await mutation.mutateAsync(candidate.id);
      finishDelete(candidate.id);
    } catch (error) {
      if (!isNoteApiErrorStatus(error, 404)) return;

      queryClient.removeQueries({ queryKey: NOTE_QUERY_KEYS.detail(candidate.id), exact: true });
      await queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.lists() });
      finishDelete(candidate.id);
      mutation.reset();
    }
  };

  return {
    candidate,
    isOpen,
    isDeleting: mutation.isPending,
    hasError: mutation.isError,
    errorInfo,
    requestDelete,
    closeDialog,
    confirmDelete,
  };
};
