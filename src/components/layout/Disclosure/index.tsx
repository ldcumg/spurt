"use client";

import { DISCLOSURE_ROOT_ID } from "@/constants/dom";
import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface DisclosureProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

export default function Disclosure({ children, isOpen, className }: DisclosureProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={twMerge(clsx("fixed inset-0 z-1000", className))}>{children}</div>,
    document.getElementById(DISCLOSURE_ROOT_ID)!,
  );
}
