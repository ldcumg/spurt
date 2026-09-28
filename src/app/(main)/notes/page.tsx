"use client";

import { MobileNavigation, NotesHero, NotesList, NotesToolbar, type SortOrder } from "./components";
import { INITIAL_NOTES, type NoteMock } from "./mock";
import { useMemo, useState } from "react";

export default function NotePage() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");

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
    const newNote: NoteMock = {
      id: Date.now(),
      title: "새로 작성한 학습 노트",
      description: "새 노트입니다. 입력 화면이나 API 요청은 연결하지 않았습니다.",
      goal: "꾸준히 학습 기록 남기기",
      task: "오늘 배운 내용 정리하기",
      date: "2026. 09. 28",
      tone: "yellow",
      isFavorite: false,
    };

    setNotes((currentNotes) => [newNote, ...currentNotes]);
    setSearchTerm("");
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
        />
      </div>
    </div>
  );
}
