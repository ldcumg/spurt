import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProgressBar from ".";

const meta: Meta<typeof ProgressBar> = {
  title: "ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    percentage: {
      control: { type: "number", min: 0, max: 100 },
      description: "작업 완료도",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    percentage: 50,
  },
};
