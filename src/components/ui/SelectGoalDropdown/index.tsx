"use client";

import AddGoalInput from "./AddGoalInput";
import GoalDropdownButton from "./GoalDropdownButton";
import GoalOptionItem from "./GoalOptionItem";
import { validateGoal } from "@/components/addTodo/utils";
import { useClickOutside } from "@/hooks/disclosure/useClickOutside";
import type { GoalListItem } from "@/types/goals.types";
import { useState } from "react";

interface SelectGoalDropdownProps {
  label?: string;
  goalOptions: GoalListItem[];
  selectedGoal: GoalListItem | null;
  setSelectedGoal: React.Dispatch<React.SetStateAction<GoalListItem | null>>;
  error?: string;
  setError?: (errorMassage: string) => void;
}

export default function SelectGoalDropdown({
  label,
  goalOptions,
  selectedGoal,
  setSelectedGoal,
  error,
  setError,
}: SelectGoalDropdownProps) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isGoalInputOpen, setIsGoalInputOpen] = useState(false);
  const containerRef = useClickOutside(() => {
    if (setError) validateGoal(selectedGoal, setError);
    setIsOptionOpen(false);
    setIsGoalInputOpen(false);
  });

  /** 옵션 선택 */
  const handleSelect = (option: GoalListItem) => {
    if (setError) validateGoal(option, setError);
    setSelectedGoal(option);
    setIsOptionOpen(false);
    setIsGoalInputOpen(false);
  };

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
        ref={containerRef}
        className="relative w-full max-w-424"
      >
        <GoalDropdownButton
          isOptionOpen={isOptionOpen}
          setIsOptionOpen={setIsOptionOpen}
          selectedGoal={selectedGoal}
          setIsGoalInputOpen={setIsGoalInputOpen}
          error={error}
        />

        {error && <p className="text-body-md text-error">{error}</p>}

        {isOptionOpen && (
          // border와 rounded를 담당하는 바깥 컨테이너
          <div
            // 스크롤바가 둥근 모서리 영역 밖으로 침범하지 않도록 잘라냄
            className="absolute top-[calc(100%+4px)] left-0 z-50 w-full origin-top overflow-hidden rounded-xl border border-[#D9DEE6] bg-white transition-[opacity,transform] duration-200 ease-out starting:-translate-y-1 starting:scale-[0.98] starting:opacity-0"
          >
            <ul
              // 실제 스크롤은 내부 ul에서 담당
              className="text-title-xs flex max-h-246 flex-col gap-12 overflow-y-auto p-12 font-bold"
            >
              {goalOptions.map((option) => {
                const isSelected = option.id === selectedGoal?.id;
                return (
                  <GoalOptionItem
                    key={option.id}
                    option={option}
                    isSelected={isSelected}
                    handleSelect={handleSelect}
                  />
                );
              })}
              <AddGoalInput
                isGoalInputOpen={isGoalInputOpen}
                setIsGoalInputOpen={setIsGoalInputOpen}
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
