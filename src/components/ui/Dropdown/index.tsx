"use client";

import TextInput from "../TextInput";
import { Check, FlagFilled, Plus, Todos, Under } from "@/assets/icons";
import { useEffect, useId, useRef, useState, type SubmitEventHandler } from "react";

export type DropDownOption = {
  id: string;
  label: string;
};

export type DropdownVariant = "goal" | "todo";

interface DropdownProps {
  options: DropDownOption[];
  value: string;
  variant?: DropdownVariant;
  placeholder?: string;
  disabled?: boolean;
  onChange: (option: DropDownOption) => void;
  onAddOption: (value: string) => void;
}

const DROPDOWN_CONFIG = {
  goal: {
    Icon: FlagFilled,
    placeholder: "목표를 선택해 주세요",
    addLabel: "새 목표 추가",
    inputPlaceholder: "목표를 입력해주세요",
    iconClassName: "text-primary-600",
    selectedClassName: "bg-primary-200",
    hoverClassName: "hover:bg-primary-200",
  },
  todo: {
    Icon: Todos,
    placeholder: "할 일을 선택해 주세요",
    addLabel: "새 할 일 추가",
    inputPlaceholder: "할 일을 입력해주세요",
    iconClassName: "text-information",
    selectedClassName: "bg-blue-light",
    hoverClassName: "hover:bg-blue-light",
  },
} as const;

/** 목표와 할 일을 선택하거나 새 항목을 추가하는 연결 정보용 드롭다운이다. */
export default function Dropdown({
  options,
  value,
  variant = "goal",
  placeholder,
  disabled = false,
  onChange,
  onAddOption,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsId = `${useId()}-options`;
  const config = DROPDOWN_CONFIG[variant];
  const LeadingIcon = config.Icon;
  const selectedOption = options.find((option) => option.id === value);

  useEffect(() => {
    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;

      setIsOpen(false);
      setIsInputOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, []);

  const handleSelect = (option: DropDownOption) => {
    onChange(option);
    setIsOpen(false);
    setIsInputOpen(false);
  };

  const handleAddSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextValue = String(formData.get("option") ?? "").trim();
    if (!nextValue) return;

    onAddOption(nextValue);
    setIsOpen(false);
    setIsInputOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[424px] font-sans"
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={optionsId}
        disabled={disabled}
        onClick={() => {
          setIsOpen((open) => !open);
          if (isOpen) setIsInputOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          setIsOpen(false);
          setIsInputOpen(false);
        }}
        className="border-input-border bg-surface-card hover:border-primary-300 focus-visible:border-primary-600 flex min-h-50 w-full items-center justify-between rounded-xl border p-8 transition-[border-color,box-shadow] duration-150 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="flex min-w-0 items-center gap-12">
          <span className={`${config.iconClassName} grid size-36 shrink-0 place-items-center`}>
            <LeadingIcon className="size-24" />
          </span>
          <span className="text-title-xs truncate">{selectedOption?.label ?? placeholder ?? config.placeholder}</span>
        </span>
        <span className={`grid size-36 shrink-0 place-items-center ${isOpen ? "rotate-180" : ""}`}>
          <Under className="size-24" />
        </span>
      </button>

      {isOpen && (
        <div className="border-input-border bg-surface-card absolute top-[calc(100%+4px)] left-0 z-50 w-full origin-top overflow-hidden rounded-xl border transition-[opacity,transform] duration-200 ease-out starting:-translate-y-1 starting:scale-[0.98] starting:opacity-0">
          <ul
            id={optionsId}
            role="listbox"
            className="text-title-xs flex max-h-246 flex-col gap-12 overflow-y-auto p-12"
          >
            {options.map((option) => {
              const isSelected = option.id === value;

              return (
                <li key={option.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={`flex w-full items-center justify-between gap-12 rounded-lg p-8 text-left ${
                      isSelected ? config.selectedClassName : "bg-transparent"
                    } ${config.hoverClassName}`}
                  >
                    <span className={`${config.iconClassName} grid size-36 shrink-0 place-items-center`}>
                      <LeadingIcon className="size-24" />
                    </span>
                    <span className="min-w-0 grow truncate">{option.label}</span>
                    <span className={`${config.iconClassName} grid size-36 shrink-0 place-items-center`}>
                      {isSelected && <Check className="size-24" />}
                    </span>
                  </button>
                </li>
              );
            })}

            <li>
              {!isInputOpen ? (
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-12 rounded-xl p-8 hover:bg-neutral-50"
                  onClick={() => setIsInputOpen(true)}
                >
                  <Plus className="size-24" />
                  {config.addLabel}
                </button>
              ) : (
                <form
                  className="flex items-center justify-center gap-12 rounded-xl p-8"
                  onSubmit={handleAddSubmit}
                >
                  <TextInput
                    name="option"
                    aria-label={config.inputPlaceholder}
                    placeholder={config.inputPlaceholder}
                    autoFocus
                  />
                  <button
                    type="submit"
                    aria-label={`${config.addLabel} 확인`}
                    className="grid size-36 shrink-0 place-items-center rounded-lg hover:bg-neutral-50"
                  >
                    <Plus className="size-24" />
                  </button>
                </form>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
