"use client";

import { MobileNavigation, NoteDetailPanel, NotesHero, NotesList, NotesToolbar, type SortOrder } from "./components";
import { toNoteViewModel } from "./noteViewModel";
import Button from "@/components/ui/Button";
import ROUTES from "@/constants/routes";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { useNoteListQuery } from "@/hooks/queries/note/useNoteQueries";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const NOTES_PAGE_SIZE = 6;

export default function NotePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const { isOpen: isDetailOpen, open: openDetail, close: closeDetail } = useDisclosure();
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

  const selectedNote = notes.find((note) => note.id === selectedNoteId) ?? null;

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

      {selectedNote && (
        <NoteDetailPanel
          note={selectedNote}
          isOpen={isDetailOpen}
          onClose={closeDetail}
        />
      )}
    </div>
  );
}
