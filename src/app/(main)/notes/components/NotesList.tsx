import type { NoteViewModel } from "../noteViewModel";
import NoteCard from "./NoteCard";
import { NoteFilled } from "@/assets/icons";
import Button from "@/components/ui/Button";

interface NotesListProps {
  notes: NoteViewModel[];
  onNoteSelect: (id: number) => void;
  onNoteDelete: (note: NoteViewModel) => void;
  isLoading?: boolean;
  isError?: boolean;
  hasSearchTerm?: boolean;
  onRetry?: () => void;
}

/** 검색·정렬된 노트 목록 또는 검색 결과가 없을 때의 빈 상태를 보여 준다. */
export default function NotesList({
  notes,
  onNoteSelect,
  onNoteDelete,
  isLoading = false,
  isError = false,
  hasSearchTerm = false,
  onRetry,
}: NotesListProps) {
  if (isLoading) {
    return (
      <section
        role="status"
        className="border-border flex min-h-240 items-center justify-center rounded-xl border bg-white px-24 text-center shadow-sm"
      >
        <p className="text-body-md text-neutral-600">노트를 불러오는 중이에요.</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        role="alert"
        className="border-border flex min-h-240 flex-col items-center justify-center rounded-xl border bg-white px-24 text-center shadow-sm"
      >
        <NoteFilled className="mb-12 size-40 text-neutral-400" />
        <h2 className="text-title-xs">노트를 불러오지 못했어요.</h2>
        <p className="text-body-md mt-4 text-neutral-600">잠시 후 다시 시도해 주세요.</p>
        {onRetry && (
          <Button
            type="button"
            variant="outline"
            size="md"
            className="mt-16"
            onClick={onRetry}
          >
            다시 시도
          </Button>
        )}
      </section>
    );
  }

  if (notes.length === 0) {
    return (
      <section className="border-border flex min-h-240 flex-col items-center justify-center rounded-xl border bg-white px-24 text-center shadow-sm">
        <NoteFilled className="mb-12 size-40 text-neutral-400" />
        <h2 className="text-title-xs">{hasSearchTerm ? "검색 결과가 없어요." : "아직 작성한 노트가 없어요."}</h2>
        <p className="text-body-md mt-4 text-neutral-600">
          {hasSearchTerm ? "검색어를 바꿔 다시 확인해보세요." : "새 노트를 작성해 성장 과정을 기록해보세요."}
        </p>
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
          onSelect={onNoteSelect}
          onDelete={onNoteDelete}
        />
      ))}
    </section>
  );
}
