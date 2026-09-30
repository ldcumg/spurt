"use client";

import { MobileNavigation, NoteDetailPanel, NotesHero, NotesList, NotesToolbar, type SortOrder } from "./components";
import { INITIAL_NOTES } from "./mock";
import ROUTES from "@/constants/routes";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function NotePage() {
  const router = useRouter();
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const { isOpen: isDetailOpen, open: openDetail, close: closeDetail } = useDisclosure();

  const selectedNote = notes.find((note) => note.id === selectedNoteId) ?? null;

  const visibleNotes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("ko-KR");
    const filteredNotes = notes.filter((note) => {
      const searchableText = [note.title, note.description, note.goal, note.task].join(" ").toLocaleLowerCase("ko-KR");

      return searchableText.includes(normalizedSearch);
    });

    return [...filteredNotes].sort((a, b) =>
      sortOrder === "recent" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }, [notes, searchTerm, sortOrder]);

  const handleFavoriteToggle = (id: number) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => (note.id === id ? { ...note, isFavorite: !note.isFavorite } : note)),
    );
  };

  const handleNewNote = () => {
    router.push(ROUTES.newNote);
  };

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id);
    openDetail();
  };

  return (
    <div className="bg-surface text-foreground min-h-screen w-full">
      <MobileNavigation />

      <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-112 md:px-32 md:pt-40 md:pb-40 xl:px-40">
        <NotesHero
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewNote={handleNewNote}
        />
        <NotesToolbar
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
        <NotesList
          notes={visibleNotes}
          onFavoriteToggle={handleFavoriteToggle}
          onNoteSelect={handleNoteSelect}
        />
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
