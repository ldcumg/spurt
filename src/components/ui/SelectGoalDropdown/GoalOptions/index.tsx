"use client";

import type { OpenState } from "../types";
import AddGoalInput from "./AddGoalInput";
import GoalOptionItem from "./GoalOptionItem";
import { useAllGoalQuery } from "@/hooks/queries/goal/useGoalQueries";
import type { GoalListItem } from "@/types/goals.types";

interface GoalOptionsProps {
  isGoalInputOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<OpenState>>;
  selectedGoal: GoalListItem | null;
  handleSelect: (option: GoalListItem) => void;
}

export default function GoalOptions({ isGoalInputOpen, selectedGoal, handleSelect, setIsOpen }: GoalOptionsProps) {
  const { data: goalData, isPending: isGoalPending, isError: isGoalError, error: goalError } = useAllGoalQuery();
  if (isGoalPending) return <div>Loading...</div>;
  if (isGoalError) return <div>Error: {goalError.message}</div>;
  const {
    data: { goals },
  } = goalData;

  return (
    // border와 rounded를 담당하는 바깥 컨테이너
    <div
      // 스크롤바가 둥근 모서리 영역 밖으로 침범하지 않도록 잘라냄
      className="absolute top-[calc(100%+4px)] left-0 z-50 w-full origin-top overflow-hidden rounded-xl border border-[#D9DEE6] bg-white transition-[opacity,transform] duration-200 ease-out starting:-translate-y-1 starting:scale-[0.98] starting:opacity-0"
    >
      <ul
        // 실제 스크롤은 내부 ul에서 담당
        className="text-title-xs flex max-h-246 flex-col gap-12 overflow-y-auto p-12 font-bold"
      >
        {goals.map((option) => {
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
          setIsOpen={setIsOpen}
        />
      </ul>
    </div>
  );
}
