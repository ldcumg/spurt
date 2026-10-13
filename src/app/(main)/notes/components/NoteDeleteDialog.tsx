"use client";

import Modal from "@/components/ui/Modal";
import ModalActions from "@/components/ui/Modal/ModalActions";

interface NoteDeleteDialogProps {
  noteTitle: string;
  isOpen: boolean;
  isDeleting?: boolean;
  errorTitle?: string;
  errorMessage?: string;
  onClose: () => void;
  onConfirm: () => void;
}

/** 삭제 전에 대상 노트를 확인하고 진행 상태와 실패 메시지를 보여준다. */
export default function NoteDeleteDialog({
  noteTitle,
  isOpen,
  isDeleting = false,
  errorTitle = "",
  errorMessage = "",
  onClose,
  onConfirm,
}: NoteDeleteDialogProps) {
  const handleClose = () => {
    if (!isDeleting) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="노트 삭제"
      onClose={handleClose}
      isCloseDisabled={isDeleting}
    >
      <p className="text-body-md text-neutral-700">
        <strong className="text-foreground-title break-words">{noteTitle}</strong>
        <br />
        노트를 삭제하시겠어요? 삭제한 노트는 복구할 수 없습니다.
      </p>
      {errorMessage && (
        <div
          role="alert"
          className="text-body-sm text-error mt-12"
        >
          {errorTitle && <strong className="block">{errorTitle}</strong>}
          <p>{errorMessage}</p>
        </div>
      )}
      <ModalActions
        onClose={handleClose}
        onConfirm={onConfirm}
        confirmButtonType="button"
        confirmButtonLabel={isDeleting ? "삭제 중..." : "삭제"}
        isCloseDisabled={isDeleting}
        isConfirmDisabled={isDeleting}
      />
    </Modal>
  );
}
