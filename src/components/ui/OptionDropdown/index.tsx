"use client";

import { More } from "@/assets/icons";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";

interface OptionDropdownProps {
  options: {
    lable: string;
    onClick: () => void;
  }[];
  layoutClassName?: string;
  optionClassName?: string;
}

// FIXME - 임시
export default function OptionDropdown({ options, layoutClassName, optionClassName }: OptionDropdownProps) {
  const { isOpen, toggle, close } = useDisclosure();

  const layoutClasses = twMerge(clsx("absolute top-30 right-0 flex flex-col gap-4 bg-white", layoutClassName));
  const optionClasses = twMerge(clsx("cursor-pointer hover:bg-neutral-300", optionClassName));

  return (
    <button
      className="relative"
      onClick={toggle}
    >
      <More />

      {isOpen && (
        <div className={layoutClasses}>
          {options.map(({ lable, onClick }, idx) => (
            <button
              className={optionClasses}
              onClick={() => {
                onClick();
                close();
              }}
              key={`${lable}-${idx}`}
            >
              {lable}
            </button>
          ))}
        </div>
      )}
    </button>
  );
}
