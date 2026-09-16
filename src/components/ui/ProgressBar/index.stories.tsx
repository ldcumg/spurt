import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProgressBar from ".";

const meta: Meta<typeof ProgressBar> = {
  title: "components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    doneCount: {
      control: { type: "number", min: 0, max: 100 },
      description: "완료한 작업 수",
    },
    totalCount: {
      control: { type: "number", min: 0, max: 100 },
      description: "총 작업 수",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default50: Story = {
  args: {
    doneCount: 5,
    totalCount: 10,
  },
};
export const Percentage100: Story = {
  args: {
    doneCount: 10,
    totalCount: 10,
  },
};
export const Percentage0: Story = {
  args: {
    doneCount: 0,
    totalCount: 10,
  },
};
