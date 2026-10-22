"use client";

import { More } from "@/assets/icons";
import { useClickOutside } from "@/hooks/disclosure/useClickOutside";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";

interface TextDropdownProps {
  options: {
    lable: string;
    onClick: () => void;
  }[];
  layoutClassName?: string;
  optionClassName?: string;
}

export default function TextDropdown({ options, layoutClassName, optionClassName }: TextDropdownProps) {
  const { isOpen, toggle, close } = useDisclosure();
  const containerRef = useClickOutside(() => {
    close();
  });

  const layoutClasses = twMerge(clsx("absolute top-40 right-0 bg-white z-10 flex flex-col gap-4", layoutClassName));
  const optionClasses = twMerge(clsx("w-100 cursor-pointer hover:bg-neutral-300", optionClassName));

  return (
    <div
      className="relative"
      ref={containerRef}
    >
      <button
        className="flex h-full"
        onClick={toggle}
        type="button"
      >
        <More className="size-24 shrink-0 cursor-pointer text-neutral-600" />
      </button>

      {isOpen && (
        <ul className={layoutClasses}>
          {options.map(({ lable, onClick }, idx) => (
            <li
              className={optionClasses}
              onClick={() => {
                onClick();
                close();
              }}
              key={`${lable}-${idx}`}
            >
              {lable}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
