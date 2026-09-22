"use client";

import TextInput from "../TextInput";
import { Check, FlagFilled, Plus, Under } from "@/assets/icons";
import type { GoalItem } from "@/types/typeGoals";
import clsx from "clsx";
import { SubmitEventHandler, useEffect, useRef, useState } from "react";

interface DropdownProps {
  options: GoalItem[];
  value?: GoalItem;
  placeholder?: string;
  disabled?: boolean;
  onChange: (option: GoalItem) => void;
  onAddGoal: (title: string) => void;
}

/**
 * 드롭다운 컴포넌트입니다.
 * @param options DropDownOption 타입을 담고있는 리스트입니다. 예: [{id: string, label: string}, ...]
 * @param value option 리스트 중에서 선택한 항목입니다.
 * @param placeholder value 가 없을 때 나오는 문구입니다.
 * @param disabled
 * @param onChange 드롭다운 메뉴중 하나를 클릭했을 때 발생하는 이벤트 (arg : DropDownOption) => void
 * @param onAddGoal 목표 생성 아이콘을 클릭했을 때 발생하는 이벤트, 매개변수는 목표 텍스트이다. (arg: string) => void
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container || !(event.target instanceof Node)) return;

      if (!container.contains(event.target)) {
        setIsOpen(false);
        setInputGoalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (option: GoalItem) => {
    onChange(option);
    setIsOpen(false);
    setInputGoalOpen(false);
  };

  const handleAddGoalClick = () => {
    setInputGoalOpen(true);
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
      className="relative w-full max-w-424"
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          setIsOpen((prev) => {
            if (prev) setInputGoalOpen(false);
            return !prev;
          })
        }
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsOpen(false);
            setInputGoalOpen(false);
          }
        }}
        className="focus-visible:border-primary-600 flex min-h-50 w-full items-center justify-between rounded-xl border border-[#D9DEE6] bg-white p-8 transition-[border-color,box-shadow] duration-150 hover:border-[#B9C6BD] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="flex items-center justify-center gap-12">
          <span className="text-primary-600 grid size-36 shrink-0 place-items-center">
            <FlagFilled className="size-24" />
          </span>
          <span className="text-title-xs">{value ? value.title : placeholder}</span>
        </span>
        <span className={clsx("grid size-36 shrink-0 place-items-center", isOpen && "rotate-180")}>
          <Under className="size-24" />
        </span>
      </button>
      {isOpen && (
        // border와 rounded를 담당하는 바깥 컨테이너
        <div
          // 스크롤바가 둥근 모서리 영역 밖으로 침범하지 않도록 잘라냄
          className="absolute top-[calc(100%+4px)] left-0 z-50 w-full origin-top overflow-hidden rounded-xl border border-[#D9DEE6] bg-white transition-[opacity,transform] duration-200 ease-out starting:-translate-y-1 starting:scale-[0.98] starting:opacity-0"
        >
          <ul
            // 실제 스크롤은 내부 ul에서 담당
            className="text-title-xs flex max-h-246 flex-col gap-12 overflow-y-auto p-12 font-bold"
          >
            {options.map((option) => {
              const isSelected = option.id === value?.id;

              return (
                <li
                  key={option.id}
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
            })}

            {inputGoalOpen ? (
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
                onClick={handleAddGoalClick}
              >
                <Plus className="size-24" />새 목표 추가
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
