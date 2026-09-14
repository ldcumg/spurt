import Input from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "이메일",
    placeholder: "이메일을 입력하세요",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = {
  args: {
    error: "유효한 이메일 형식이 아닙니다",
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
export const NoLabel: Story = {
  args: {
    label: undefined,
    placeholder: "라벨이 없는 인풋입니다",
  },
};
export const Password: Story = {
  args: {
    label: "비밀번호",
    type: "password",
  },
};
