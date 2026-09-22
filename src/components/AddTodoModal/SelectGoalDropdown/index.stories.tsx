import SelectGoalDropdown from ".";
import type { GoalItem } from "@/types/typeGoals";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

const goals: GoalItem[] = [
  {
    id: 1,
    title: "자바스크립트로 웹 서비스 만들기",
    teamId: "string",
    userId: 1,
    todoCount: 1,
    completedCount: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 2,
    title: "디자인 시스템 강의 듣기",
    teamId: "string",
    userId: 1,
    todoCount: 1,
    completedCount: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 3,
    title: "프론트엔드 포트폴리오 완성하기",
    teamId: "string",
    userId: 1,
    todoCount: 1,
    completedCount: 1,
    createdAt: "",
    updatedAt: "",
  },
];

const meta = {
  title: "components/AddTodoDropdown",
  component: SelectGoalDropdown,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectGoalDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

function AddTodoDropdownExample() {
  const [selectedOption, setSelectedOption] = useState<GoalItem | null>({
    id: 3,
    title: "프론트엔드 포트폴리오 완성하기",
    teamId: "stringnumber",
    userId: 1,
    todoCount: 1,
    completedCount: 1,
    createdAt: "",
    updatedAt: "",
  });

  return (
    <SelectGoalDropdown
      error=""
      label="드롭다운"
      goalOptions={goals}
      selectedGoal={selectedOption}
      setSelectedGoal={setSelectedOption}
    />
  );
}

function AddTodoDropdownNoList() {
  const [selectedOption, setSelectedOption] = useState<GoalItem | null>(null);

  return (
    <SelectGoalDropdown
      error=""
      label="빈 리스트"
      goalOptions={[]}
      selectedGoal={selectedOption}
      setSelectedGoal={setSelectedOption}
    />
  );
}

function AddTodoDropdownNoSelect() {
  const [selectedOption, setSelectedOption] = useState<GoalItem | null>(null);

  return (
    <SelectGoalDropdown
      error={selectedOption ? "" : "목표를 선택해 주세요"}
      label="목표 미선택"
      goalOptions={goals}
      selectedGoal={selectedOption}
      setSelectedGoal={setSelectedOption}
    />
  );
}

function AddTodoDropdownOverflow() {
  const [selectedOption, setSelectedOption] = useState<GoalItem | null>({
    id: 4,
    title: "컨텐츠 내용이 오버플로우가 되도록 아주 많이 텍스트를 입력해보자.",
    teamId: "string",
    userId: 1,
    todoCount: 1,
    completedCount: 1,
    createdAt: "",
    updatedAt: "",
  });
  const goalsWithOverflow = [
    ...goals,
    {
      id: 4,
      title: "컨텐츠 내용이 오버플로우가 되도록 아주 많이 텍스트를 입력해보자.",
      teamId: "string",
      userId: 1,
      todoCount: 1,
      completedCount: 1,
      createdAt: "",
      updatedAt: "",
    },
  ];
  return (
    <SelectGoalDropdown
      error=""
      label="텍스트 오버플로우"
      goalOptions={goalsWithOverflow}
      selectedGoal={selectedOption}
      setSelectedGoal={setSelectedOption}
    />
  );
}

export const Default: Story = {
  args: {
    label: "목표",
    goalOptions: [],
    selectedGoal: null,
    setSelectedGoal: () => {},
    error: "",
  },

  render: () => (
    <div className="flex h-[120vh] flex-col gap-32">
      <div className="min-h-100">
        <AddTodoDropdownExample />
      </div>

      <div className="min-h-100">
        <AddTodoDropdownNoList />
      </div>

      <div className="min-h-100">
        <AddTodoDropdownNoSelect />
      </div>

      <div className="min-h-100">
        <AddTodoDropdownOverflow />
      </div>
    </div>
  ),
};
