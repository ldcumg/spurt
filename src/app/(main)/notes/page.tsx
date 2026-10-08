"use client";

import { MobileNavigation, NoteDetailPanel, NotesHero, NotesList, NotesToolbar, type SortOrder } from "./components";
import { useNotesStore } from "./noteStore";
import Button from "@/components/ui/Button";
import ROUTES from "@/constants/routes";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const NOTES_PAGE_SIZE = 6;

export default function NotePage() {
  const router = useRouter();
  const notes = useNotesStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");
  const [visibleNoteCount, setVisibleNoteCount] = useState(NOTES_PAGE_SIZE);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const { isOpen: isDetailOpen, open: openDetail, close: closeDetail } = useDisclosure();

  const selectedNote = notes.find((note) => note.id === selectedNoteId) ?? null;

  const filteredAndSortedNotes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("ko-KR");
    const filteredNotes = notes.filter((note) => note.title.toLocaleLowerCase("ko-KR").includes(normalizedSearch));

    return [...filteredNotes].sort((a, b) =>
      sortOrder === "recent" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }, [notes, searchTerm, sortOrder]);
  const visibleNotes = filteredAndSortedNotes.slice(0, visibleNoteCount);
  const hasMoreNotes = visibleNoteCount < filteredAndSortedNotes.length;

  const handleNewNote = () => {
    router.push(ROUTES.newNote);
  };

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id);
    openDetail();
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setVisibleNoteCount(NOTES_PAGE_SIZE);
  };

  const handleSortOrderChange = (value: SortOrder) => {
    setSortOrder(value);
    setVisibleNoteCount(NOTES_PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleNoteCount((currentCount) => currentCount + NOTES_PAGE_SIZE);
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
          notes={visibleNotes}
          onNoteSelect={handleNoteSelect}
        />
        {hasMoreNotes && (
          <div className="mt-24 flex justify-center md:mt-32">
            <Button
              type="button"
              variant="outline"
              size="xl"
              onClick={handleLoadMore}
            >
              노트 더 보기
            </Button>
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
