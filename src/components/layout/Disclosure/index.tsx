"use client";

import { DISCLOSURE_ROOT_ID } from "@/constants/dom";
import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface DisclosureProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOverlayClick?: () => void;
  className?: string;
}

export default function Disclosure({ children, isOpen, onOverlayClick, className }: DisclosureProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayClasses = twMerge(clsx("fixed inset-0 z-1000", className));

  return createPortal(
    <div
      className={overlayClasses}
      onClick={onOverlayClick}
    >
      {children}
    </div>,
    document.getElementById(DISCLOSURE_ROOT_ID)!,
  );
}
