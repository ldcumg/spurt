"use client";

import { Check, FlagFilled, Plus, Under } from "@/assets/icons";
import { SubmitEventHandler, useEffect, useRef, useState } from "react";
import TextInput from "../TextInput";

export type DropDownOption = {
  id: string;
  label: string;
};

interface DropdownProps {
  options: DropDownOption[];
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (option: DropDownOption) => void;
  onAddGoal: (value: string) => void;
}

const goals: DropDownOption[] = [
  { id: "javascript-service", label: "자바스크립트로 웹 서비스 만들기" },
  { id: "design-system", label: "디자인 시스템 강의 듣기" },
  { id: "portfolio", label: "프론트엔드 포트폴리오 완성하기" },
];
/**
 * 드롭다운 컴포넌트입니다.
 * @param options DropDownOption 타입을 담고있는 리스트입니다. 예: [{id: string, label: string}, ...]
 * @param value option 리스트 중에서 선택한 항목의 id 입니다.
 * @param placeholder option 이 없을 때 나오는 문구입니다.
 * @param disabled
 * @param onChange 드롭다운 메뉴중 하나를 클릭했을 때 발생하는 이벤트 (arg : DropDownOption) => void
 * @param onAddGoal 목표 생성 아이콘을 클릭했을 때 발생하는 이벤트, 매개변수는 목표 텍스트이다. (arg: string) => void
 * @returns
 */
export default function Dropdown({
  options,
  value,
  placeholder = "목표를 선택해 주세요",
  disabled = false,
  onChange,
  onAddGoal,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputGoalOpen, setInputGoalOpen] = useState(false);
  const [goal, setGoal] = useState("");
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
  const handleAddGoalClick = () => {
    setInputGoalOpen(true);
    setGoal("");
  };
  const handleAddGoalSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const goal = formData.get("goal");
    onAddGoal(String(goal));
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
            <FlagFilled className="size-[24px]" />
          </span>
          <span className="text-title-xs">{selectedOption?.label ?? placeholder}</span>
        </span>
        <span className={["grid size-[36px] shrink-0 place-items-center", isOpen && "rotate-180"].join(" ")}>
          <Under className="size-[24px]" />
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
          {options.map((option) => {
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
                  <FlagFilled className="size-[24px]" />
                </span>
                <span className="min-w-0 grow truncate">{option.label}</span>

                {isSelected && (
                  <span className="text-primary-600 grid size-[36px] shrink-0 place-items-center">
                    <Check className="size-[24px]" />
                  </span>
                )}
              </li>
            );
          })}
          {!inputGoalOpen ? (
            <li
              className="text-title-xs flex cursor-pointer justify-center gap-[12px] rounded-xl p-8"
              onClick={handleAddGoalClick}
            >
              <Plus className="size-[24px]" />새 목표 추가
            </li>
          ) : (
            <form
              className="text-title-xs flex cursor-pointer items-center justify-center gap-[12px] rounded-xl p-8"
              onSubmit={handleAddGoalSubmit}
            >
              <TextInput
                name="goal"
                placeholder="목표를 입력해주세요"
              />
              <button type="submit">
                <Plus className="size-[24px]" />
              </button>
            </form>
          )}
        </ul>
      )}
    </div>
  );
}
