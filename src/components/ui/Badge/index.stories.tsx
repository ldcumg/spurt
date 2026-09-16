import Badge from ".";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    //layout: "center",
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["todo", "done", "goal", "category"],
      description: "뱃지 종류",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Variants: Story = {
  args: {
    type: "todo",
    className: "",
  },
  render: ({ type, className }) => (
    <div className="flex gap-80">
      {/* justify-center 사용할까 말까... */}
      <div className="flex flex-col gap-10">
        <p>Test</p>
        <Badge
          type={type}
          className={className}
        />
      </div>

      <div className="flex flex-col gap-10">
        <p>OverView</p>
        <div className="flex gap-10">
          <Badge
            type="todo"
            className={className}
          />
          <Badge
            type="done"
            className={className}
          />
          <Badge
            type="goal"
            className={className}
          />
          <Badge
            type="category"
            className={className}
          />
        </div>
      </div>
    </div>
  ),
};

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
