"use client";

import { X } from "@/assets/icons";
import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";
import dynamic from "next/dynamic";

const Disclosure = dynamic(() => import("@/components/layout/Disclosure"), {
  ssr: false,
});

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  className?: string;
}

/**
 * @param children - 모달 본문
 * @param isOpen - 모달 열림 여부 const { isOpen } = useDisclosure()
 * @param onClose - 모달 닫기 함수 const { close } = useDisclosure()
 * @param title - 모달 제목
 */
export default function Modal({ children, isOpen, onClose, title, className }: ModalProps) {
  const modalClasses = twMerge(
    clsx("flex h-full w-full flex-col overflow-y-auto bg-white md:h-auto md:w-456 md:rounded-2xl", className),
  );

  return (
    <Disclosure
      className="fixed inset-0 flex flex-col items-center justify-center bg-black/60"
      isOpen={isOpen}
    >
      <div className={modalClasses}>
        <header className="flex w-full flex-row items-center justify-between">
          <h1 className="text-title-sm md:text-title-md">{title}</h1>
          <button onClick={onClose}>
            <X className="size-24 text-neutral-400" />
          </button>
        </header>
        {children}
      </div>
    </Disclosure>
  );
}
