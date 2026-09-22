import Dropdown from "./";
import type { GoalItem } from "@/types/typeGoals";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

const goals: GoalItem[] = [
  {
    id: 1,
    title: "자바스크립트로 웹 서비스 만들기",
    teamId: "stringnumber",
    userId: 1,
    todoCount: 1,
    completedCount: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 2,
    title: "디자인 시스템 강의 듣기",
    teamId: "stringnumber",
    userId: 1,
    todoCount: 1,
    completedCount: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 3,
    title: "프론트엔드 포트폴리오 완성하기",
    teamId: "stringnumber",
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

function DropdownExample({ label }: { label: string }) {
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
    <div>
      <p className="mb-12 text-sm font-bold">{label}</p>

      <Dropdown
        options={goals}
        value={value}
        onChange={(option) => {
          setValue(option);
        }}
        onAddGoal={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}

function DropdownNoList({ label }: { label: string }) {
  const [value, setValue] = useState<GoalItem | null>(null);

  return (
    <div>
      <p className="mb-12 text-sm font-bold">{label}</p>

      <Dropdown
        options={[]}
        value={value}
        onChange={(option) => {
          setValue(option);
        }}
        onAddGoal={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}

function DropdownInvalidValue({ label }: { label: string }) {
  const [value, setValue] = useState("invalid");
  return (
    <div>
      <p className="mb-12 text-sm font-bold">{label}</p>

      <Dropdown
        options={goals}
        value={value}
        onChange={(option) => {
          setValue(option.id);
        }}
        onAddGoal={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}

function DropdownOverflow({ label }: { label: string }) {
  const [value, setValue] = useState("overflow-text");
  const goalsWithOverflow = [
    ...goals,
    {
      id: "overflow-text",
      label: "컨텐츠 내용이 오버플로우가 되도록 아주 많이 텍스트를 입력해보자.",
    },
  ];
  return (
    <div>
      <p className="mb-12 text-sm font-bold">{label}</p>

      <Dropdown
        options={goalsWithOverflow}
        value={value}
        onChange={(option) => {
          setValue(option.id);
        }}
        onAddGoal={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <div className="flex h-[120vh] flex-col gap-32">
      <div className="min-h-100">
        <DropdownExample label="드롭다운" />
      </div>

      <div className="min-h-100">
        <DropdownNoList label="빈 리스트" />
      </div>

      <div className="min-h-100">
        <DropdownInvalidValue label="잘못된 값 입력" />
      </div>

      <div className="min-h-100">
        <DropdownOverflow label="텍스트 오버플로우" />
      </div>
    </div>
  ),
};
