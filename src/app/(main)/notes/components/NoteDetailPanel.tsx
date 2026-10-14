"use client";

import type { NoteTone, NoteViewModel } from "../noteViewModel";
import NoteDetailBody from "./NoteDetailBody";
import NoteDetailState from "./NoteDetailState";
import { Edit, NoteFilled, X } from "@/assets/icons";
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
  note: NoteViewModel | null;
  isOpen: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isNotFound?: boolean;
  errorTitle?: string;
  errorMessage?: string;
  canRetry?: boolean;
  onClose: () => void;
  onNotFoundClose?: () => void;
  onRetry?: () => void;
  onEdit?: () => void;
}

const DETAIL_TITLE_ID = "note-detail-title";

export default function NoteDetailPanel({
  note,
  isOpen,
  isLoading = false,
  isError = false,
  isNotFound = false,
  errorTitle = "노트를 불러오지 못했어요",
  errorMessage = "잠시 후 다시 시도해 주세요.",
  canRetry = true,
  onClose,
  onNotFoundClose,
  onRetry,
  onEdit,
}: NoteDetailPanelProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
        aria-labelledby={DETAIL_TITLE_ID}
        className="bg-surface-card [&::-webkit-scrollbar-thumb]:bg-primary-400 [&::-webkit-scrollbar-thumb:hover]:bg-primary-500 [&::-webkit-scrollbar-track]:bg-primary-50 absolute inset-y-0 right-0 z-10 h-full w-full [scrollbar-width:thin] [scrollbar-color:var(--color-primary-400)_var(--color-primary-50)] overflow-y-auto px-24 py-32 shadow-lg md:px-40 md:py-40 xl:w-720 xl:rounded-l-3xl [&::-webkit-scrollbar]:w-8 [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <header className="flex flex-wrap items-center gap-12 md:flex-nowrap">
          <span
            className={`flex size-52 shrink-0 items-center justify-center rounded-xl md:size-48 ${
              note ? NOTE_TONE_CLASSES[note.tone] : "bg-primary-50 text-primary-500"
            }`}
          >
            <NoteFilled className="size-24" />
          </span>
          <span className="text-title-sm text-neutral-600 md:hidden">노트 상세</span>
          <h2
            id={DETAIL_TITLE_ID}
            className="text-title-lg text-foreground-title md:text-title-md order-last mt-20 w-full md:order-none md:mt-0 md:min-w-0 md:flex-1"
          >
            {note?.title ?? (isNotFound ? "노트를 찾을 수 없어요" : isError ? errorTitle : "노트를 불러오는 중이에요")}
          </h2>
          <div className="ml-auto flex shrink-0 items-center gap-8">
            {note && onEdit && !isLoading && !isError && !isNotFound && (
              <Button
                type="button"
                variant="outline"
                size="md"
                className="inline-flex items-center gap-6"
                onClick={onEdit}
              >
                <Edit className="size-18" />
                수정
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="md"
              autoFocus
              aria-label="노트 상세 닫기"
              className="flex size-36 shrink-0 items-center justify-center p-0 text-neutral-500"
              onClick={onClose}
            >
              <X className="size-24" />
            </Button>
          </div>
        </header>

        <NoteDetailState
          isLoading={isLoading}
          isError={isError}
          isNotFound={isNotFound}
          errorMessage={errorMessage}
          canRetry={canRetry}
          onNotFoundClose={onNotFoundClose}
          onRetry={onRetry}
        />

        {note && !isLoading && !isError && !isNotFound && <NoteDetailBody note={note} />}
      </aside>
    </Disclosure>
  );
}
