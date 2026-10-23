import { Check, FlagFilled } from "@/assets/icons/index";
import Dropdown, { DropDownOption } from "@/components/ui/Dropdown";
import TextDropdown from "@/components/ui/TextDropdown";
import TextInput from "@/components/ui/TextInput";
import { useClickOutside } from "@/hooks/disclosure/useClickOutside";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { GoalListItem } from "@/types/goals.types";
import { useState } from "react";

interface GoalTitleProps {
  goal: GoalListItem;
  goalList: GoalListItem[];
  onSelectGoal?: (goalId: string) => void; // 목표 변경 시 호출할 콜백
  onAddGoal?: (newTitle: string) => void; // 새 목표 추가 시 호출할 콜백
  onUpdateTitle?: (newTitle: string) => void; // 제목 수정 시 호출할 콜백
  onDeleteGoal?: (goalId: number) => void; // 목표 삭제 시 호출할 콜백
}

export default function GoalTitle({
  goal,
  goalList,
  onSelectGoal,
  onAddGoal,
  onUpdateTitle,
  onDeleteGoal,
}: GoalTitleProps) {
  const { isOpen: isTyping, close: inputClose, toggle: editTitle } = useDisclosure();
  const { isOpen: isModalOpen, close: modalClose, toggle: changeGoal } = useDisclosure();

  const [titleInput, setTitleInput] = useState(goal.title);

  /** 인풋 바깥 클릭 시 입력창 닫기 */
  const inputContainerRef = useClickOutside(() => {
    inputClose();
  });
  /** Dropdown 컴포넌트 규격에 맞게 매핑 */
  const dropdownOptions: DropDownOption[] = (goalList || []).map((item) => ({
    id: String(item.id),
    label: item.title,
  }));

  /** 다른 목표 선택 시 */
  const handleSelectGoal = (selected: DropDownOption) => {
    onSelectGoal?.(selected.id);
    modalClose();
  };

  /** 새 목표 추가 시 */
  const handleAddGoal = (value: string) => {
    onAddGoal?.(value);
    modalClose();
  };

  /** 목표 제목 수정 완료 시 */
  const handleSaveTitle = () => {
    if (titleInput.trim()) {
      onUpdateTitle?.(titleInput);
    }
    inputClose();
  };

  const handleDelete = () => {
    onDeleteGoal?.(goal.id);
  };

  return (
    <div className="col-span-2 flex flex-2 flex-row items-center justify-between gap-8 rounded-md bg-white p-20 shadow-sm">
      <div className="flex flex-row items-center justify-center gap-16">
        <div className="bg-primary-100 flex size-64 shrink-0 items-center justify-center rounded-full">
          <FlagFilled className="text-primary-600 size-32" />
        </div>
        {isTyping ? (
          <div
            className="flex w-full flex-row gap-12"
            ref={inputContainerRef}
          >
            <TextInput
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder={goal.title}
              autoFocus
            />
            <button
              type="button"
              onClick={handleSaveTitle}
            >
              <Check className="text-primary-600 size-24 shrink-0" />
            </button>
          </div>
        ) : isModalOpen ? (
          <div className="w-full max-w-[400px]">
            <Dropdown
              variant="goal"
              options={dropdownOptions}
              value={String(goal.id)}
              onChange={handleSelectGoal}
              onAddOption={handleAddGoal}
            />
          </div>
        ) : (
          <p className="text-title-md">{goal.title}</p>
        )}
      </div>
      <TextDropdown
        options={[
          {
            lable: "목표 제목 수정",
            onClick: () => {
              modalClose();
              setTitleInput(goal.title);
              editTitle();
            },
          },
          {
            lable: "목표 삭제",
            onClick: () => {
              handleDelete();
            },
          },
          {
            lable: "다른 목표",
            onClick: () => {
              inputClose();
              modalClose();
              changeGoal();
            },
          },
        ]}
        layoutClassName=""
        optionClassName=""
      />
    </div>
  );
}
