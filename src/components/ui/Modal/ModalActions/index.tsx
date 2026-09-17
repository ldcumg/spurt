"use client";

import Button from "../../Button";

interface ModalActionsProps {
  onClose?: () => void;
  onConfirm?: () => void;
  closeButtonLabel?: string;
  confirmButtonLabel?: string;
  isConfirmDisabled?: boolean;
}

/**
 * @param onClose - 닫기 버튼 함수 / props로 내려줘야 취소 버튼이 생김 const { close } = useDisclosure()
 * @param onConfirm - 확인 버튼 함수 / props로 내려줘야 확인 버튼이 생김
 * @param closeButtonLabel - 닫기 버튼 라벨 default: "취소"
 * @param confirmButtonLabel - 확인 버튼 라벨 default: "확인"
 * @param isConfirmDisabled - 확인 버튼 disabled default: false
 */
export default function ModalActions({
  onClose,
  onConfirm,
  closeButtonLabel = "취소",
  confirmButtonLabel = "확인",
  isConfirmDisabled,
}: ModalActionsProps) {
  return (
    <div className="mt-auto flex w-full gap-10 px-20 py-15">
      {onClose && (
        <Button
          onClick={onClose}
          className="border-neutral-400 text-neutral-400"
          size="wide"
          variant="outline"
        >
          {closeButtonLabel}
        </Button>
      )}
      {onConfirm && (
        <Button
          onClick={onConfirm}
          disabled={isConfirmDisabled}
          size="wide"
        >
          {confirmButtonLabel}
        </Button>
      )}
    </div>
  );
}
