"use client";

import type { OpenState } from "../../types";
import { Plus } from "@/assets/icons";
import TextInput from "@/components/ui/TextInput";
import { validateTitle } from "@/components/ui/TodoFormTrigger/index.utils";
import { useAddGoalMutation } from "@/hooks/mutations/goal/useGoalMutations";
import { useState } from "react";

interface AddGoalInputProps {
  isGoalInputOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<OpenState>>;
}

/** 새 목표 입력 폼을 열고 제출하는 드롭다운 항목입니다. */
export default function AddGoalInput({ isGoalInputOpen, setIsOpen }: AddGoalInputProps) {
  const { mutate: addGoalMutate } = useAddGoalMutation();
  const [titleValue, setTitleValue] = useState("");
  const [errorMassage, setErrorMassage] = useState("");

  /** 새 목표 추가 */
  const handleAddGoal = () => {
    if (validateTitle(titleValue, setErrorMassage)) {
      alert(errorMassage);
      return;
    }
    addGoalMutate({ title: titleValue });
    setIsOpen((prev) => ({ ...prev, goalInput: false }));
    setTitleValue("");
  };

  return (
    <>
      {isGoalInputOpen ? (
        <div className="text-title-xs flex items-center justify-center gap-12 rounded-xl p-8">
          <TextInput
            name="goal"
            placeholder="목표를 입력해주세요"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <button
            onClick={handleAddGoal}
            type="button"
          >
            <Plus className="size-24" />
          </button>
        </div>
      ) : (
        <li
          className="text-title-xs flex cursor-pointer justify-center gap-12 rounded-xl p-8"
          onClick={() => setIsOpen((prev) => ({ ...prev, goalInput: true }))}
        >
          <Plus className="size-24" />새 목표 추가
        </li>
      )}
    </>
  );
}
