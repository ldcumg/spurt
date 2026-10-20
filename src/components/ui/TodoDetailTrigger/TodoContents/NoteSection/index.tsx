"use client";

import { NoteColor } from "@/assets/icons";
import { useNoteDetailsQueries } from "@/hooks/queries/note/useNoteQueries";
import type { NoteResponse } from "@/types/notes.types";

interface NoteSectionProps {
  noteIds: number[];
  handleNoteDetailOpen: (note: NoteResponse) => void;
}

export default function NoteSection({ noteIds, handleNoteDetailOpen }: NoteSectionProps) {
  const noteQueries = useNoteDetailsQueries(noteIds);

  return (
    <section className="flex flex-col gap-16">
      <h3 className="text-title-xs md:text-title-sm">작성된 노트</h3>
      <div className="flex flex-col gap-20">
        {noteQueries.map(({ data, isPending, isError, error }, index) => {
          if (isPending) return <div key={index}>Loading...</div>;

          if (isError) return <div key={index}>{error.message}</div>;

          return (
            <div
              className="flex cursor-pointer flex-row items-center gap-12 rounded-xl border p-16"
              onClick={() => handleNoteDetailOpen(data)}
              key={data.id}
            >
              <NoteColor className="size-32" />
              <span className="text-title-xs xl:text-title-sm">{data.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
