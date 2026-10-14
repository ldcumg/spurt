import SelectGoalDropdown from ".";
import { goalMocks as mocks } from "@/mocks/handlers/goal/mocks";
import type { GoalListItem } from "@/types/goals.types";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { http, HttpResponse } from "msw";
import { useState } from "react";

const meta = {
  title: "components/SelectGoalDropdown",
  component: SelectGoalDropdown,
  parameters: {
    layout: "padded",
  },
  args: {
    selectedGoal: null,
    setSelectedGoal: () => {},
  },
} satisfies Meta<typeof SelectGoalDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const goalMocks = mocks.goals;

function mswHandler(goals?: GoalListItem[]) {
  return {
    msw: {
      handlers: [
        http.get("/api/goals", () => {
          return HttpResponse.json({
            ...mocks,
            goals,
          });
        }),
      ],
    },
  };
}

/** 선택된 목표가 있는 기본 드롭다운 예시를 렌더링합니다. */
export const SelectedGoal: Story = {
  args: {
    selectedGoal: null,
    setSelectedGoal: () => {},
  },
  parameters: mswHandler(goalMocks),

  render: () => {
    const [selectedOption, setSelectedOption] = useState<GoalListItem | null>({
      id: 3,
      title: "프론트엔드 포트폴리오 완성하기",
      teamId: "stringnumber",
      userId: 1,
      createdAt: "",
      updatedAt: "",
      todoCount: 0,
      completedCount: 0,
    });

    return (
      <SelectGoalDropdown
        label="드롭다운"
        selectedGoal={selectedOption}
        setSelectedGoal={setSelectedOption}
      />
    );
  },
};

/** 선택할 목표가 없는 드롭다운 예시를 렌더링합니다. */
export const NoList: Story = {
  parameters: mswHandler([]),

  render: () => {
    const [selectedOption, setSelectedOption] = useState<GoalListItem | null>(null);

    return (
      <SelectGoalDropdown
        label="빈 리스트"
        selectedGoal={selectedOption}
        setSelectedGoal={setSelectedOption}
      />
    );
  },
};

/** 목표를 선택하지 않아 오류가 표시되는 예시를 렌더링합니다. */
export const NoSelect: Story = {
  parameters: mswHandler(goalMocks),

  render: () => {
    const [selectedOption, setSelectedOption] = useState<GoalListItem | null>(null);

    return (
      <SelectGoalDropdown
        error={selectedOption ? "" : "목표를 선택해 주세요"}
        label="목표 미선택"
        selectedGoal={selectedOption}
        setSelectedGoal={setSelectedOption}
      />
    );
  },
};

/** 목표명이 길어 말줄임 처리되는 드롭다운 예시를 렌더링합니다. */
export const Overflow: Story = {
  parameters: mswHandler([
    ...goalMocks,
    {
      id: 4,
      title: "컨텐츠 내용이 오버플로우가 되도록 아주 많이 텍스트를 입력해보자.",
      teamId: "string",
      userId: 1,
      createdAt: "",
      updatedAt: "",
      todoCount: 0,
      completedCount: 0,
    },
  ]),

  render: () => {
    const [selectedOption, setSelectedOption] = useState<GoalListItem | null>({
      id: 4,
      title: "컨텐츠 내용이 오버플로우가 되도록 아주 많이 텍스트를 입력해보자.",
      teamId: "string",
      userId: 1,
      createdAt: "",
      updatedAt: "",
      todoCount: 0,
      completedCount: 0,
    });

    return (
      <SelectGoalDropdown
        label="텍스트 오버플로우"
        selectedGoal={selectedOption}
        setSelectedGoal={setSelectedOption}
      />
    );
  },
};
