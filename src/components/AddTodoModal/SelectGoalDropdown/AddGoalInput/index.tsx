"use client";

import { Plus } from "@/assets/icons";
import TextInput from "@/components/ui/TextInput";
import type { SubmitEventHandler } from "react";

interface AddGoalInputProps {
  isGoalInputOpen: boolean;
  setIsGoalInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddGoalInput({ isGoalInputOpen, setIsGoalInputOpen }: AddGoalInputProps) {
  /** 새 목표 추가 */
  const handleAddGoalSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const goal = formData.get("goal");
    // TODO - 새 목표 추가 로직 완성되면 가져오기
    // onAddGoal(String(goal));
  };

  return (
    <>
      {isGoalInputOpen ? (
        <form
          className="text-title-xs flex items-center justify-center gap-12 rounded-xl p-8"
          onSubmit={handleAddGoalSubmit}
        >
          <TextInput
            name="goal"
            placeholder="목표를 입력해주세요"
          />
          <button type="submit">
            <Plus className="size-24" />
          </button>
        </form>
      ) : (
        <li
          className="text-title-xs flex cursor-pointer justify-center gap-12 rounded-xl p-8"
          onClick={() => setIsGoalInputOpen(true)}
        >
          <Plus className="size-24" />새 목표 추가
        </li>
      )}
    </>
  );
}
