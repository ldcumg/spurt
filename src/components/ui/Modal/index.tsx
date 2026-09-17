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
}

/**
 * @param children - 모달 본문
 * @param isOpen - 모달 열림 여부 const { isOpen } = useDisclosure()
 * @param title - 모달 제목
 * @param onClose - 모달 닫기 함수 const { close } = useDisclosure()
 */
export default function Modal({ children, isOpen, title, onClose }: ModalProps) {
  return (
    <Disclosure isOpen={isOpen}>
      <div className="flex h-full w-full flex-col bg-white px-20 pb-15 md:h-auto md:w-360 md:rounded-2xl md:px-24 md:pb-24">
        <header className="flex w-full flex-row items-center justify-between py-30 md:py-24">
          <h1 className="text-title-sm">{title}</h1>
          <button onClick={onClose}>
            <X className="size-14" />
          </button>
        </header>
        {children}
      </div>
    </Disclosure>
  );
}
