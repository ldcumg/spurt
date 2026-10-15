"use client";

import { X } from "@/assets/icons";
import dynamic from "next/dynamic";

const Disclosure = dynamic(() => import("@/components/layout/Disclosure"), {
  ssr: false,
});

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: React.ReactNode;
  onClose: () => void;
  isCloseDisabled?: boolean;
}

/**
 * @param children - 모달 본문
 * @param isOpen - 모달 열림 여부 const { isOpen } = useDisclosure()
 * @param title - 모달 제목
 * @param onClose - 모달 닫기 함수 const { close } = useDisclosure()
 */
export default function Modal({ children, isOpen, title, onClose, isCloseDisabled = false }: ModalProps) {
  return (
    <Disclosure
      className="fixed inset-0 flex flex-col items-center justify-center bg-black/60"
      isOpen={isOpen}
    >
      <div className="flex h-full w-full flex-col overflow-y-auto bg-white p-32 md:h-auto md:w-456 md:rounded-2xl md:p-40">
        <header className="flex w-full flex-row items-center justify-between">
          <h1 className="text-title-sm md:text-title-md">{title}</h1>
          <button
            type="button"
            aria-label="모달 닫기"
            disabled={isCloseDisabled}
            className="disabled:cursor-not-allowed disabled:opacity-40"
            onClick={onClose}
          >
            <X className="size-24 text-neutral-400" />
          </button>
        </header>
        {children}
      </div>
    </Disclosure>
  );
}
