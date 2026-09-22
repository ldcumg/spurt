"use client";

import AddGoalInput from "./AddGoalInput";
import GoalDropdownButton from "./GoalDropdownButton";
import GoalOptionItem from "./GoalOptionItem";
import type { GoalItem } from "@/types/typeGoals";
import { useEffect, useRef, useState } from "react";

interface SelectGoalDropdownProps {
  label: string;
  goalOptions: GoalItem[];
  selectedGoal: GoalItem | null;
  setSelectedGoal: React.Dispatch<React.SetStateAction<GoalItem | null>>;
  error: string;
}

export default function SelectGoalDropdown({
  label,
  goalOptions,
  selectedGoal,
  setSelectedGoal,
  error,
}: SelectGoalDropdownProps) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isGoalInputOpen, setIsGoalInputOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /** 컨테이너 바깥 클릭 시 드랍다운 닫기 */
    const outsideClickEvent = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container || !(event.target instanceof Node)) return;

      if (!container.contains(event.target)) {
        setIsOptionOpen(false);
        setIsGoalInputOpen(false);
      }
    };

    document.addEventListener("mousedown", outsideClickEvent);

    return () => {
      document.removeEventListener("mousedown", outsideClickEvent);
    };
  }, []);

  return (
    <>
      <label
        className="mb-12 text-sm font-bold"
        htmlFor="option-button"
      >
        {label}
      </label>

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
                    setSelectedGoal={setSelectedGoal}
                    setIsOptionOpen={setIsOptionOpen}
                    setIsGoalInputOpen={setIsGoalInputOpen}
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
    </>
  );
}
