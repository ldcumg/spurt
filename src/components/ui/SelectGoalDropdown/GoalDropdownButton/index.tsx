"use client";

import { FlagFilled, Under, Up } from "@/assets/icons";
import type { GoalResponse } from "@/types/goals.types";

interface GoalDropdownButtonProps {
  isOptionOpen: boolean;
  closeDropdown: () => void;
  selectedGoal: GoalResponse | null;
  error?: string;
}

/** 선택된 목표를 표시하고 목표 옵션 목록을 여닫는 버튼입니다. */
export default function GoalDropdownButton({
  isOptionOpen,
  closeDropdown,
  selectedGoal,
  error,
}: GoalDropdownButtonProps) {
  /** esc 입력 시 드랍다운 닫기 */
  const handleEscKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") {
      closeDropdown();
    }
  };

  return (
    <button
      id="option-button"
      type="button"
      onClick={closeDropdown}
      onKeyDown={handleEscKey}
      className={`flex min-h-50 w-full items-center justify-between rounded-xl border bg-white p-8 transition-[border-color,box-shadow] duration-150 hover:border-[#B9C6BD] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-error" : "border-input-border focus:border-primary-500"}`}
    >
      <span className="flex items-center justify-center gap-12">
        <span className="text-primary-600 grid size-36 shrink-0 place-items-center">
          <FlagFilled className="size-24" />
        </span>
        <span className="text-title-xs">{selectedGoal ? selectedGoal.title : "목표를 선택해 주세요"}</span>
      </span>
      <span className="grid size-36 shrink-0 place-items-center">
        {isOptionOpen ? <Under className="size-24" /> : <Up className="size-24" />}
      </span>
    </button>
  );
}
