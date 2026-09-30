"use client";

import type { NoteMock, NoteTone } from "../mock";
import { Calendar, Flag, Link, NoteFilled, Todos, X } from "@/assets/icons";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Disclosure = dynamic(() => import("@/components/layout/Disclosure"), {
  ssr: false,
});

const NOTE_TONE_CLASSES: Record<NoteTone, string> = {
  mint: "bg-mint-light text-mint",
  coral: "bg-coral-light text-coral",
  blue: "bg-blue-light text-blue",
  yellow: "bg-yellow-light text-warning",
};

interface NoteDetailPanelProps {
  note: NoteMock;
  isOpen: boolean;
  onClose: () => void;
}

function DetailRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
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

export default function NoteDetailPanel({ note, isOpen, onClose }: NoteDetailPanelProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const paragraphs = note.detail?.paragraphs ?? [note.description];
  const sections = note.detail?.sections ?? [];

  return (
    <Disclosure isOpen={isOpen}>
      <button
        type="button"
        tabIndex={-1}
        aria-label="노트 상세 닫기"
        className="absolute inset-0"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={`note-detail-title-${note.id}`}
        className="bg-surface-card [&::-webkit-scrollbar-thumb]:bg-primary-400 [&::-webkit-scrollbar-thumb:hover]:bg-primary-500 [&::-webkit-scrollbar-track]:bg-primary-50 absolute inset-y-0 right-0 z-10 h-full w-full [scrollbar-width:thin] [scrollbar-color:var(--color-primary-400)_var(--color-primary-50)] overflow-y-auto px-24 py-32 shadow-lg md:px-40 md:py-40 xl:w-720 xl:rounded-l-3xl [&::-webkit-scrollbar]:w-8 [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <header className="flex flex-wrap items-center gap-12 md:flex-nowrap">
          <span
            className={`flex size-52 shrink-0 items-center justify-center rounded-xl md:size-48 ${NOTE_TONE_CLASSES[note.tone]}`}
          >
            <NoteFilled className="size-24" />
          </span>
          <span className="text-title-sm text-neutral-600 md:hidden">노트 상세</span>
          <h2
            id={`note-detail-title-${note.id}`}
            className="text-title-lg text-foreground-title md:text-title-md order-last mt-20 w-full md:order-none md:mt-0 md:min-w-0 md:flex-1"
          >
            {note.title}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="md"
            autoFocus
            aria-label="노트 상세 닫기"
            className="ml-auto flex size-36 shrink-0 items-center justify-center p-0 text-neutral-500"
            onClick={onClose}
          >
            <X className="size-24" />
          </Button>
        </header>

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

        {note.detail?.source && (
          <a
            href={note.detail.source.url}
            target="_blank"
            rel="noreferrer"
            className="hover:border-primary-300 flex min-w-0 items-center gap-12 rounded-xl border border-transparent bg-neutral-50 p-16 transition-colors"
          >
            <span className="bg-primary-50 text-primary-600 flex size-40 shrink-0 items-center justify-center rounded-lg">
              <Link className="size-22" />
            </span>
            <span className="min-w-0">
              <strong className="text-title-xs text-foreground-title block truncate">{note.detail.source.title}</strong>
              <span className="text-body-sm mt-2 block truncate text-neutral-500">{note.detail.source.url}</span>
            </span>
          </a>
        )}

        <article className={`text-body-lg text-neutral-800 ${note.detail?.source ? "mt-32" : ""}`}>
          <div className="flex flex-col gap-16">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {sections.map((section) => (
            <section
              key={section.title}
              className="mt-28"
            >
              <h3 className="text-title-sm flex items-start gap-8">
                <span aria-hidden>{section.emoji}</span>
                <span>{section.title}</span>
              </h3>
              <ul className="mt-12 list-disc space-y-6 pl-24">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </article>
      </aside>
    </Disclosure>
  );
}
