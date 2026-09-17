"use client";

import { DISCLOSURE_ROOT_ID } from "@/constants/dom";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface DisclosureProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function Disclosure({ children, isOpen }: DisclosureProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-1000 flex flex-col items-center justify-center bg-black/60">{children}</div>,
    document.getElementById(DISCLOSURE_ROOT_ID)!,
  );
}
