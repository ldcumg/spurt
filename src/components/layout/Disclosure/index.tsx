"use client";

import { DISCLOSURE_ROOT_ID } from "@/constants/dom";
import { useLockBodyScroll } from "@/hooks/disclosure/useLockBodyScroll";
import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";
import { createPortal } from "react-dom";

interface DisclosureProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

export default function Disclosure({ children, isOpen, className }: DisclosureProps) {
  const disclosureClasses = twMerge(clsx("fixed inset-0 z-9999 flex flex-col items-center bg-white", className));

  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return createPortal(
    <div className={disclosureClasses}>{children}</div>,
    document.getElementById(DISCLOSURE_ROOT_ID)!,
  );
}
