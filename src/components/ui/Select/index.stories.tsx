import Select, { type SelectOption } from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

const sortOptions: SelectOption[] = [
  { value: "recent", label: "최신순" },
  { value: "oldest", label: "오래된순" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "정렬 순서",
    options: sortOptions,
    value: "recent",
    onChange: () => {},
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

function SelectExample() {
  const [value, setValue] = useState("recent");

  return (
    <Select
      label="정렬 순서"
      options={sortOptions}
      value={value}
      onChange={setValue}
    />
  );
}

export const Default: Story = {
  render: () => <SelectExample />,
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LongOptions: Story = {
  args: {
    label: "보기 방식",
    options: [
      { value: "updated", label: "최근 수정한 노트부터 보기" },
      { value: "created", label: "처음 작성한 노트부터 보기" },
    ],
    value: "updated",
  },
};
