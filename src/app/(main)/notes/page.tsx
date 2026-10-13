"use client";

import {
  MobileNavigation,
  NoteDeleteDialog,
  NoteDetailPanel,
  NotesHero,
  NotesList,
  NotesToolbar,
  type SortOrder,
} from "./components";
import { toNoteViewModel } from "./noteViewModel";
import type { NoteViewModel } from "./noteViewModel";
import Button from "@/components/ui/Button";
import NOTE_QUERY_KEYS from "@/constants/queryKeys/note";
import ROUTES from "@/constants/routes";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { useDeleteNoteMutation } from "@/hooks/mutations/note/useNoteMutations";
import { useNoteDetailQuery, useNoteListQuery } from "@/hooks/queries/note/useNoteQueries";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const NOTES_PAGE_SIZE = 6;

export default function NotePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteNoteMutation = useDeleteNoteMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<NoteViewModel | null>(null);
  const { isOpen: isDetailOpen, open: openDetail, close: closeDetail } = useDisclosure();
  const { isOpen: isDeleteOpen, open: openDelete, close: closeDelete } = useDisclosure();
  const normalizedSearchTerm = searchTerm.trim();
  const noteListParams = useMemo(
    () => ({
      limit: NOTES_PAGE_SIZE,
      sort: sortOrder === "recent" ? ("latest" as const) : ("oldest" as const),
      ...(normalizedSearchTerm ? { search: normalizedSearchTerm } : {}),
    }),
    [normalizedSearchTerm, sortOrder],
  );
  const { data, isPending, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError } =
    useNoteListQuery(noteListParams);
  const notes = useMemo(() => data?.pages.flatMap((page) => page.notes.map(toNoteViewModel)) ?? [], [data]);
  const hasInitialLoadError = isError && !data;
  const {
    data: selectedNoteData,
    isPending: isDetailPending,
    isError: isDetailError,
    isFetching: isDetailFetching,
    error: detailError,
    refetch: refetchNoteDetail,
  } = useNoteDetailQuery(selectedNoteId ?? 0, selectedNoteId !== null && isDetailOpen);
  const selectedNote = useMemo(() => (selectedNoteData ? toNoteViewModel(selectedNoteData) : null), [selectedNoteData]);
  const hasDetailLoadError = isDetailError && !selectedNoteData;
  const isDetailNotFound = hasDetailLoadError && isAxiosError(detailError) && detailError.response?.status === 404;

  const handleNewNote = () => {
    router.push(ROUTES.newNote);
  };

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id);
    openDetail();
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortOrderChange = (value: SortOrder) => {
    setSortOrder(value);
  };

  const handleLoadMore = () => {
    void fetchNextPage();
  };

  const handleDeleteRequest = (note: NoteViewModel) => {
    deleteNoteMutation.reset();
    setDeleteCandidate(note);
    openDelete();
  };

  const handleDeleteClose = () => {
    if (deleteNoteMutation.isPending) return;

    closeDelete();
    setDeleteCandidate(null);
    deleteNoteMutation.reset();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCandidate || deleteNoteMutation.isPending) return;

    try {
      await deleteNoteMutation.mutateAsync(deleteCandidate.id);
      if (selectedNoteId === deleteCandidate.id) {
        closeDetail();
        setSelectedNoteId(null);
      }
      closeDelete();
      setDeleteCandidate(null);
    } catch {
      // mutation 상태를 통해 삭제 실패 안내를 표시한다.
    }
  };

  const handleNotFoundClose = () => {
    closeDetail();
    setSelectedNoteId(null);
    void queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.lists() });
  };

  return (
    <div className="bg-surface text-foreground min-h-screen w-full">
      <MobileNavigation />

      <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-112 md:px-32 md:pt-40 md:pb-40 xl:px-40">
        <NotesHero
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onNewNote={handleNewNote}
        />
        <NotesToolbar
          sortOrder={sortOrder}
          onSortOrderChange={handleSortOrderChange}
        />
        <NotesList
          notes={notes}
          onNoteSelect={handleNoteSelect}
          onNoteDelete={handleDeleteRequest}
          isLoading={isPending}
          isError={hasInitialLoadError}
          hasSearchTerm={Boolean(normalizedSearchTerm)}
          onRetry={() => void refetch()}
        />
        {hasNextPage && !isPending && !hasInitialLoadError && (
          <div className="mt-24 flex justify-center md:mt-32">
            <div className="text-center">
              {isFetchNextPageError && <p className="text-body-sm text-error mb-8">추가 노트를 불러오지 못했어요.</p>}
              <Button
                type="button"
                variant="outline"
                size="xl"
                disabled={isFetchingNextPage}
                onClick={handleLoadMore}
              >
                {isFetchingNextPage ? "불러오는 중..." : isFetchNextPageError ? "다시 시도" : "노트 더 보기"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {selectedNoteId !== null && (
        <NoteDetailPanel
          note={selectedNote}
          isOpen={isDetailOpen}
          isLoading={isDetailPending || (hasDetailLoadError && isDetailFetching)}
          isError={hasDetailLoadError && !isDetailNotFound && !isDetailFetching}
          isNotFound={isDetailNotFound && !isDetailFetching}
          onClose={closeDetail}
          onEdit={selectedNote ? () => router.push(ROUTES.editNote(selectedNote.id)) : undefined}
          onNotFoundClose={handleNotFoundClose}
          onRetry={() => void refetchNoteDetail()}
        />
      )}

      {deleteCandidate && (
        <NoteDeleteDialog
          noteTitle={deleteCandidate.title}
          isOpen={isDeleteOpen}
          isDeleting={deleteNoteMutation.isPending}
          errorMessage={deleteNoteMutation.isError ? "노트를 삭제하지 못했어요. 잠시 후 다시 시도해 주세요." : ""}
          onClose={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
