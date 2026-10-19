import type { NoteViewModel } from "../noteViewModel";
import NoteContent from "./NoteContent";
import { Calendar, Flag, Link, Todos } from "@/assets/icons";
import Badge from "@/components/ui/Badge";
import type { ReactNode } from "react";

interface NoteDetailBodyProps {
  note: NoteViewModel;
}

interface DetailRowProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

function DetailRow({ icon, label, children }: DetailRowProps) {
  return (
    <div className="flex min-w-0 items-start gap-12">
      <div className="flex w-84 shrink-0 items-center gap-8 text-neutral-500">
        {icon}
        <span className="text-body-md">{label}</span>
      </div>
      <div className="text-body-md md:text-body-lg min-w-0 flex-1 text-neutral-800">{children}</div>
    </div>
  );
}

/** 조회가 완료된 노트의 목표, 할 일, 날짜, 링크와 본문을 표시한다. */
export default function NoteDetailBody({ note }: NoteDetailBodyProps) {
  return (
    <>
      <div className="mt-32 flex flex-col gap-16 md:mt-24">
        <DetailRow
          icon={<Flag className="size-20" />}
          label="목표"
        >
          {note.goal}
        </DetailRow>
        <DetailRow
          icon={<Todos className="size-20" />}
          label="할 일"
        >
          <div className="flex min-w-0 items-center gap-10">
            <Badge
              type="todo"
              className="shrink-0 [&>p]:block"
            />
            <span className="min-w-0">{note.task}</span>
          </div>
        </DetailRow>
        <DetailRow
          icon={<Calendar className="size-20" />}
          label="날짜"
        >
          <time>{note.date}</time>
        </DetailRow>
      </div>

      <div className="border-border my-32 border-t" />

      {note.linkUrl && (
        <a
          href={note.linkUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:border-primary-300 flex min-w-0 items-center gap-12 rounded-xl border border-transparent bg-neutral-50 p-16 transition-colors"
        >
          <span className="bg-primary-50 text-primary-600 flex size-40 shrink-0 items-center justify-center rounded-lg">
            <Link className="size-22" />
          </span>
          <span className="min-w-0">
            <strong className="text-title-xs text-foreground-title block truncate">참고 링크</strong>
            <span className="text-body-sm mt-2 block truncate text-neutral-500">{note.linkUrl}</span>
          </span>
        </a>
      )}

      {note.content ? (
        <NoteContent
          content={note.content}
          className={note.linkUrl ? "mt-32" : ""}
        />
      ) : (
        <article className={`text-body-lg text-neutral-800 ${note.linkUrl ? "mt-32" : ""}`}>
          <p>{note.description}</p>
        </article>
      )}
    </>
  );
}
