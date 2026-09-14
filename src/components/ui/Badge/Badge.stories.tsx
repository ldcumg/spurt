import Badge from ".";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["todo", "done", "goal", "category"],
      description: "뱃지 종류",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Todo: Story = {
  args: {
    type: "todo",
  },
};
export const Done: Story = {
  args: {
    type: "done",
  },
};

export const Goal: Story = {
  args: {
    type: "goal",
  },
};

export const Category: Story = {
  args: {
    type: "category",
  },
};
