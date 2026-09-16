"use client";

import { useEffect, useRef, useState } from "react";

// 임시 svg
function TempIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-[24px] fill-current stroke-current stroke-[1.8]"
    >
      <path
        d="M6 3v18M7 4h11l-2.6 4L18 12H7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-[24px] shrink-0 fill-none stroke-current stroke-2"
    >
      <path
        d="m6 9 6 6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-[24px] shrink-0 fill-none stroke-current stroke-2"
    >
      <path
        d="m5 12.5 4.2 4.2L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type DropDownOption = {
  id: string;
  label: string;
};

type DropdownProps = {
  options: DropDownOption[];
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (option: DropDownOption) => void;
};
const goals: DropDownOption[] = [
  { id: "javascript-service", label: "자바스크립트로 웹 서비스 만들기" },
  { id: "design-system", label: "디자인 시스템 강의 듣기" },
  { id: "portfolio", label: "프론트엔드 포트폴리오 완성하기" },
];

export default function Dropdown({
  options = goals,
  value = "portfolio",
  placeholder = "목표를 선택해 주세요",
  disabled = false,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      if (!container.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const selectedOption = options.find((option) => option.id === value);
  const handleSelect = (option: DropDownOption) => {
    onChange(option);
    setIsOpen(false);
  };
  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[424px] font-sans"
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key == "Escape") {
            setIsOpen(false);
          }
        }}
        className={[
          "flex min-h-[50px] w-full items-center justify-between",
          "rounded-xl border border-[#D9DEE6] bg-white",
          "p-8",
          "transition-[border-color,box-shadow] duration-150",
          "hover:border-[#B9C6BD]",
          "focus-visible:border-primary-600 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
        ].join(" ")}
      >
        <span className="flex items-center justify-center gap-[12px]">
          <span className="text-primary-600 grid size-[36px] shrink-0 place-items-center">
            <TempIcon />
          </span>
          <span className="text-title-xs">{selectedOption?.label ?? placeholder}</span>
        </span>
        <span className={["grid size-[36px] shrink-0 place-items-center", isOpen && "rotate-180"].join(" ")}>
          <ChevronDownIcon />
        </span>
      </button>
      {isOpen && (
        <ul
          className={[
            "absolute top-[calc(100%+4px)] left-0 z-50",
            "max-h-[246px] w-full overflow-y-auto",
            "flex flex-col gap-[12px]",
            "p-12",
            "rounded-xl border border-[#D9DEE6] bg-white p-8",
            "text-title-xs font-bold",
          ].join(" ")}
        >
          {options.length === 0 ? (
            <li className="text-title-xs flex gap-[12px] rounded-xl p-8">
              <TempIcon />
              등록된 목표가 없습니다.
            </li>
          ) : (
            options.map((option) => {
              const isSelected = option.id === value;

              return (
                <li
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={[
                    "text-title-xs",
                    "cursor-pointer",
                    isSelected ? "bg-primary-200" : "bg-transparent",
                    "hover:bg-primary-200",
                    "p-8",
                    "flex items-center justify-between gap-[12px]",
                    "rounded-lg",
                  ].join(" ")}
                >
                  <span className="text-primary-600 grid size-[36px] shrink-0 place-items-center">
                    <TempIcon />
                  </span>
                  <span className="min-w-0 grow truncate">{option.label}</span>

                  {isSelected && (
                    <span className="text-primary-600 grid size-[36px] shrink-0 place-items-center">
                      <CheckIcon />
                    </span>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
