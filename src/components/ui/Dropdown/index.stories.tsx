import type { Meta, StoryObj } from "@storybook/nextjs";
import { userEvent, within } from "storybook/test";
import { useState } from "react";

import Dropdown, { type DropDownOption } from "./";
import { Burger } from "@/assets/icons";

const goals: DropDownOption[] = [
  {
    id: "javascript-service",
    label: "자바스크립트로 웹 서비스 만들기",
  },
  {
    id: "design-system",
    label: "디자인 시스템 강의 듣기",
  },
  {
    id: "portfolio",
    label: "프론트엔드 포트폴리오 완성하기",
  },
];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

function DropdownExample({ label }: { label: string }) {
  const [value, setValue] = useState("portfolio");

  return (
    <div>
      <p className="mb-12 text-sm font-bold">{label}</p>

      <Dropdown
        options={goals}
        value={value}
        onChange={(option) => {
          setValue(option.id);
        }}
      />
    </div>
  );
}

function DropdownNoList({ label }: { label: string }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <p className="mb-12 text-sm font-bold">{label}</p>

      <Dropdown
        options={[]}
        value={value}
        onChange={(option) => {
          setValue(option.id);
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
      />
    </div>
  );
}

export const Default: Story = {
  args: {
    options: goals,
    value: "portfolio",
    onChange: () => {},
  },

  render: () => {
    return (
      <div className="flex h-[120vh] flex-col gap-32">
        {/* dropdown 메뉴가 absolute이므로 공간 확보 */}
        <div className="min-h-[100px]">
          <DropdownExample label="드롭다운" />
        </div>

        <div className="min-h-[100px]">
          <DropdownNoList label="빈 리스트" />
        </div>

        <div className="min-h-[100px]">
          <DropdownInvalidValue label="잘못된 값 입력" />
        </div>
        <div className="min-h-[100px]">
          <DropdownOverflow label="텍스트 오버플로우" />
        </div>
      </div>
    );
  },
};
