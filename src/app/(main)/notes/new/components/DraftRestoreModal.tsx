"use client";

import { formatCreatedAt } from "../../noteFormUtils";
import Modal from "@/components/ui/Modal";
import ModalActions from "@/components/ui/Modal/ModalActions";

interface DraftRestoreModalProps {
  isOpen: boolean;
  draftTitle: string;
  savedAt: string;
  onSkip: () => void;
  onRestore: () => void;
}

export default function DraftRestoreModal({ isOpen, draftTitle, savedAt, onSkip, onRestore }: DraftRestoreModalProps) {
  const displayTitle = draftTitle.trim() || "제목 없는 노트";

  return (
    <Modal
      isOpen={isOpen}
      title="임시저장한 노트가 있어요"
      onClose={onSkip}
    >
      <p className="text-body-md text-neutral-700">이어서 작성할 노트를 확인해 주세요.</p>

      <dl className="border-border bg-primary-50 mt-16 rounded-xl border p-16">
        <div>
          <dt className="sr-only">노트 제목</dt>
          <dd className="text-title-xs text-foreground-title line-clamp-2 break-words">{displayTitle}</dd>
        </div>
        <div className="text-caption mt-8 flex flex-wrap gap-x-8 text-neutral-600">
          <dt>저장 시각</dt>
          <dd>
            <time dateTime={savedAt}>{formatCreatedAt(savedAt)}</time>
          </dd>
        </div>
      </dl>

      <div className="[&>div]:grid [&>div]:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <ModalActions
          onClose={onSkip}
          onConfirm={onRestore}
          closeButtonLabel="이번에는 불러오지 않기"
          confirmButtonLabel="불러오기"
          confirmButtonType="button"
        />
      </div>
    </Modal>
  );
}
