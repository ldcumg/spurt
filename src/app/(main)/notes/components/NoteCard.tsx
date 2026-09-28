import type { NoteMock, NoteTone } from "../mock";
import { FlagFilled, More, NoteFilled, Star, StarFilled, Todos } from "@/assets/icons";
import Button from "@/components/ui/Button";
import type { ReactNode } from "react";

const NOTE_TONE_CLASSES: Record<NoteTone, string> = {
  mint: "bg-mint-light text-mint",
  coral: "bg-coral-light text-coral",
  blue: "bg-blue-light text-blue",
  yellow: "bg-yellow-light text-warning",
};

function NoteInfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-8 rounded-md bg-neutral-50 px-12 py-4">
      <span className="shrink-0">{icon}</span>
      <strong className="text-caption shrink-0 text-neutral-800">{label}</strong>
      <span className="text-body-sm truncate text-neutral-700">{value}</span>
    </div>
  );
}

interface NoteCardProps {
  note: NoteMock;
  onFavoriteToggle: (id: number) => void;
}

/** 한 건의 노트 내용과 중요 표시 동작을 보여 준다. */
export default function NoteCard({ note, onFavoriteToggle }: NoteCardProps) {
  return (
    <article className="border-border bg-surface-card flex min-w-0 flex-col rounded-xl border p-16 shadow-sm md:p-20">
      <div className="mb-12 flex items-start justify-between gap-12">
        <div className={`flex size-48 shrink-0 items-center justify-center rounded-lg ${NOTE_TONE_CLASSES[note.tone]}`}>
          <NoteFilled className="size-24" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={note.isFavorite ? `${note.title} 중요 해제` : `${note.title} 중요 표시`}
            aria-pressed={note.isFavorite}
            onClick={() => onFavoriteToggle(note.id)}
            className="px-8"
          >
            {note.isFavorite ? (
              <StarFilled className="text-warning size-32" />
            ) : (
              <Star className="size-32 text-neutral-500" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={`${note.title} 더보기`}
            className="px-8"
            onClick={() => {}}
          >
            <More className="size-20 text-neutral-500" />
          </Button>
        </div>
      </div>

      <h2 className="text-title-xs text-foreground-title md:text-title-sm line-clamp-1">{note.title}</h2>
      <p className="text-body-md mt-4 mb-12 line-clamp-2 text-neutral-600">{note.description}</p>

      <div className="mt-auto flex flex-col gap-6">
        <NoteInfoRow
          icon={<FlagFilled className="text-warning size-16" />}
          label="목표"
          value={note.goal}
        />
        <NoteInfoRow
          icon={<Todos className="text-mint size-16" />}
          label="할 일"
          value={note.task}
        />
      </div>

      <div className="mt-10 flex min-w-0 items-center justify-end gap-8">
        <time className="text-body-sm shrink-0 text-neutral-500">{note.date}</time>
      </div>
    </article>
  );
}
