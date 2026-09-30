import type { NoteMock } from "../mock";
import NoteCard from "./NoteCard";
import { NoteFilled } from "@/assets/icons";

interface NotesListProps {
  notes: NoteMock[];
  onFavoriteToggle: (id: number) => void;
  onNoteSelect: (id: number) => void;
}

/** 검색·정렬된 노트 목록 또는 검색 결과가 없을 때의 빈 상태를 보여 준다. */
export default function NotesList({ notes, onFavoriteToggle, onNoteSelect }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <section className="border-border flex min-h-240 flex-col items-center justify-center rounded-xl border bg-white px-24 text-center shadow-sm">
        <NoteFilled className="mb-12 size-40 text-neutral-400" />
        <h2 className="text-title-xs">조건에 맞는 노트가 없어요.</h2>
        <p className="text-body-md mt-4 text-neutral-600">검색어를 바꿔 다시 확인해보세요.</p>
      </section>
    );
  }

  return (
    <section
      aria-label="노트 목록"
      className="grid grid-cols-1 gap-16 lg:grid-cols-2 xl:grid-cols-3 xl:gap-20"
    >
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onFavoriteToggle={onFavoriteToggle}
          onSelect={onNoteSelect}
        />
      ))}
    </section>
  );
}
