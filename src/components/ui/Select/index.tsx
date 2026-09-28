"use client";

import { Check, Under } from "@/assets/icons";
import { twMerge } from "@/lib/twMerge";
import { useEffect, useId, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * <select>의 브라우저 기본 UI 대신 프로젝트의 디자인을 적용하기 위해 만든 단일 선택 컴포넌트다.
 * 트리거와 옵션 클릭, 바깥 영역 클릭으로 열림 상태를 제어한다.
 *
 * value를 컴포넌트 내부에서 보관하지 않는 제어 컴포넌트다. 사용자가 옵션을
 * 선택하면 onChange를 호출하고, 부모가 전달한 value가 바뀌면서 화면도 갱신된다.
 *
 * @example
 * const [sortOrder, setSortOrder] = useState("recent");
 *
 * <Select
 *   label="정렬 순서"
 *   options={[
 *     { value: "recent", label: "최신순" },
 *     { value: "oldest", label: "오래된순" },
 *   ]}
 *   value={sortOrder}
 *   onChange={setSortOrder}
 * />
 */
export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "선택해 주세요",
  disabled = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsId = `${useId()}-options`;
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);

    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, []);

  const handleToggle = () => {
    if (options.length > 0) setIsOpen((open) => !open);
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={twMerge("relative inline-block min-w-160", className)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={optionsId}
        disabled={disabled}
        onClick={handleToggle}
        className="border-input-border bg-surface-card hover:border-primary-300 focus-visible:border-primary-500 focus-visible:ring-primary-100 flex h-44 w-full cursor-pointer items-center gap-8 rounded-xl border px-12 text-left shadow-sm transition-[border-color,box-shadow] duration-150 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="text-caption shrink-0 font-semibold text-neutral-500">{label}</span>
        <span
          aria-hidden="true"
          className="bg-border h-16 w-px shrink-0"
        />
        <span className="text-body-md text-foreground-title min-w-0 flex-1 truncate font-semibold">
          {selectedOption?.label ?? placeholder}
        </span>
        <span className="bg-primary-50 text-primary-600 flex size-28 shrink-0 items-center justify-center rounded-lg">
          <Under className={twMerge("size-16 transition-transform duration-150", isOpen && "rotate-180")} />
        </span>
      </button>

      {isOpen && (
        <div className="border-input-border bg-surface-card absolute top-[calc(100%+8px)] right-0 z-50 w-full min-w-max origin-top overflow-hidden rounded-xl border p-4 shadow-lg transition-[opacity,transform] duration-150 starting:-translate-y-4 starting:scale-95 starting:opacity-0">
          <div
            id={optionsId}
            className="flex flex-col gap-2"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelect(option)}
                  className={twMerge(
                    "text-body-md focus-visible:bg-primary-50 flex h-40 min-w-152 cursor-pointer items-center justify-between gap-12 rounded-lg px-12 text-left font-semibold text-neutral-700 transition-colors outline-none",
                    isSelected ? "bg-primary-100 text-primary-700" : "hover:bg-primary-50 hover:text-primary-700",
                  )}
                >
                  <span className="whitespace-nowrap">{option.label}</span>
                  {/* 모든 행의 폭을 같게 유지하기 위해 체크가 없어도 동일한 아이콘 공간을 확보한다. */}
                  <span className="flex size-20 shrink-0 items-center justify-center">
                    {isSelected && <Check className="text-primary-600" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
