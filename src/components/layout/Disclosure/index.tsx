import { DISCLOSURE_ROOT_ID } from "@/constants/dom";
import { useLockBodyScroll } from "@/hooks/disclosure/useLockBodyScroll";
import { createPortal } from "react-dom";

interface DisclosureProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function Disclosure({ children, isOpen }: DisclosureProps) {
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center">{children}</div>,
    document.getElementById(DISCLOSURE_ROOT_ID)!,
  );
}
