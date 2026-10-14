"use client";

import GoalDropdownButton from "./GoalDropdownButton";
import GoalOptions from "./GoalOptions";
import { INITAIL_OPEN_STATE } from "./constants";
import type { OpenState } from "./types";
import { validateGoal } from "@/components/addTodo/utils";
import { useClickOutside } from "@/hooks/disclosure/useClickOutside";
import type { GoalListItem } from "@/types/goals.types";
import { useState } from "react";

interface SelectGoalDropdownProps {
  label?: string;
  selectedGoal: GoalListItem | null;
  setSelectedGoal: React.Dispatch<React.SetStateAction<GoalListItem | null>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectGoalDropdown({
  label,
  selectedGoal,
  setSelectedGoal,
  error,
  setError,
}: SelectGoalDropdownProps) {
  const [isOen, setIsOpen] = useState<OpenState>(INITAIL_OPEN_STATE);
  /** 드랍다운 닫기 */
  const closeDropdown = () => setIsOpen(INITAIL_OPEN_STATE);

  /** 드랍다운 밖 클릭 시 드랍다운 닫기 */
  const containerRef = useClickOutside(() => {
    if (setError) validateGoal(selectedGoal, setError);
    closeDropdown();
  });

  return (
    <div className="flex w-full flex-col gap-8">
      {label && (
        <label
          className="text-title-xs"
          htmlFor="option-button"
        >
          {label}
        </label>
      )}

      <div
        className="relative w-full max-w-424"
        ref={containerRef}
      >
        <GoalDropdownButton
          isOptionOpen={isOen.option}
          setIsOpen={setIsOpen}
          closeDropdown={closeDropdown}
          selectedGoal={selectedGoal}
          error={error}
        />

        {error && <p className="text-body-md text-error">{error}</p>}

        {isOen.option && (
          <GoalOptions
            isGoalInputOpen={isOen.goalInput}
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
            closeDropdown={closeDropdown}
            setError={setError}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
}
