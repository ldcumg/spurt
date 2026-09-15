import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProgressRing from ".";

const meta: Meta<typeof ProgressRing> = {
  title: "ProgressRing",
  component: ProgressRing,
  tags: ["autodocs"],
  argTypes: {
    percentage: {
      control: { type: "number", min: 0, max: 100 },
      description: "작업 완료도",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressRing>;

export const Default: Story = {
  args: {
    percentage: 50,
  },
};
