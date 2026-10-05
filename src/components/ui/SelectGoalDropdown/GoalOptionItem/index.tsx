"use client";

import { Check, FlagFilled } from "@/assets/icons";
import type { GoalResponse } from "@/types/goals.types";

interface GoalOptionItemProps {
  option: GoalResponse;
  isSelected: boolean;
  setSelectedGoal: React.Dispatch<React.SetStateAction<GoalResponse | null>>;
  setIsOptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGoalInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/** 선택 상태를 표시하고 선택 이벤트를 처리하는 목표 옵션입니다. */
export default function GoalOptionItem({
  option,
  isSelected,
  setSelectedGoal,
  setIsOptionOpen,
  setIsGoalInputOpen,
}: GoalOptionItemProps) {
  /** 옵션 선택 */
  const handleSelect = (option: GoalResponse) => {
    setSelectedGoal(option);
    setIsOptionOpen(false);
    setIsGoalInputOpen(false);
  };

  return (
    <li
      onClick={() => handleSelect(option)}
      className={`text-title-xs hover:bg-primary-200 flex cursor-pointer items-center justify-between gap-12 rounded-lg p-8 ${isSelected ? "bg-primary-200" : "bg-transparent"}`}
    >
      <span className="text-primary-600 grid size-36 shrink-0 place-items-center">
        <FlagFilled className="size-24" />
      </span>

      <span className="min-w-0 grow truncate">{option.title}</span>

      {isSelected && (
        <span className="text-primary-600 grid size-36 shrink-0 place-items-center">
          <Check className="size-24" />
        </span>
      )}
    </li>
  );
}
