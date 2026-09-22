import Dropdown from "./";
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
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    options: [],
    value: {
      id: 3,
      title: "프론트엔드 포트폴리오 완성하기",
      teamId: "stringnumber",
      userId: 1,
      todoCount: 1,
      completedCount: 1,
      createdAt: "",
      updatedAt: "",
    },
    onChange: () => {},
    onAddGoal: () => {},
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

function DropdownExample() {
  const [value, setValue] = useState({
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
    <Dropdown
      label="드롭다운"
      options={goals}
      value={value}
      onChange={(option) => {
        setValue(option);
      }}
      onAddGoal={(value) => {
        console.log(value);
      }}
    />
  );
}

function DropdownNoList() {
  const [value, setValue] = useState<GoalItem | undefined>(undefined);

  return (
    <Dropdown
      label="빈 리스트"
      options={[]}
      value={value}
      onChange={(option) => {
        setValue(option);
      }}
      onAddGoal={(value) => {
        console.log(value);
      }}
    />
  );
}

// function DropdownInvalidValue() {
//   const [value, setValue] = useState<GoalItem | undefined>("invalid");
//   return (
//     <Dropdown
//       label="잘못된 값 입력"
//       options={goals}
//       value={value}
//       onChange={(option) => {
//         setValue(option);
//       }}
//       onAddGoal={(value) => {
//         console.log(value);
//       }}
//     />
//   );
// }

function DropdownOverflow() {
  const [value, setValue] = useState<GoalItem | undefined>({
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
    <Dropdown
      label="텍스트 오버플로우"
      options={goalsWithOverflow}
      value={value}
      onChange={(option) => {
        setValue(option);
      }}
      onAddGoal={(value) => {
        console.log(value);
      }}
    />
  );
}

export const Default: Story = {
  render: () => (
    <div className="flex h-[120vh] flex-col gap-32">
      <div className="min-h-100">
        <DropdownExample />
      </div>

      <div className="min-h-100">
        <DropdownNoList />
      </div>

      {/* <div className="min-h-100">
        <DropdownInvalidValue />
      </div> */}

      <div className="min-h-100">
        <DropdownOverflow />
      </div>
    </div>
  ),
};
