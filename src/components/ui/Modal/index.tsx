"use client";

import { X } from "@/assets/icons";
import dynamic from "next/dynamic";

const Disclosure = dynamic(() => import("@/components/layout/Disclosure"), {
  ssr: false,
});

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  className?: string;
}

/**
 * @param children - 모달 본문
 * @param isOpen - 모달 열림 여부 const { isOpen } = useDisclosure()
 * @param title - 모달 제목
 * @param onClose - 모달 닫기 함수 const { close } = useDisclosure()
 */
export default function Modal({ children, isOpen, title, onClose, className }: ModalProps) {
  return (
    <Disclosure
      className={className}
      isOpen={isOpen}
    >
      <header className="flex w-full flex-row items-center justify-between px-20 py-30">
        <h1 className="text-title-sm">{title}</h1>
        <button onClick={onClose}>
          <X className="size-14" />
        </button>
      </header>
      {children}
    </Disclosure>
  );
}
