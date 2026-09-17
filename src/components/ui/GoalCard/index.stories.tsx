import GoalCard from ".";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Goal, Todos } from "./mock";

const meta = {
  title: "components/GoalCard",
  component: GoalCard,
  tags: ["autodocs"],
  parameters: {
    //layout: "centerd",
  },
  argTypes: {
    goal: {
      description: "목표(Goal) 정보 객체",
      control: "object",
    },
    todos: {
      description: "해당 목표에 속한 할 일 목록 배열",
      control: "object",
    },
  },
} satisfies Meta<typeof GoalCard>;

export default meta;

type Story = StoryObj<typeof GoalCard>;

export const Default: Story = {
  args: {
    goal: {
      ...Goal.goals[0],
      title: Goal.goals[0].title,
      todoCount: Goal.goals[0].todoCount,
      completedCount: Goal.goals[0].completedCount,
    },
    todos: Todos.todos.map((todo) => ({ ...todo, done: todo.done })),
  },
  render: (args) => (
    <div className="bg-primary-100 w-[400px]">
      <GoalCard {...args} />
      <p>*rounded를 보여 드리기 위해 배경색이 있습니다.</p>
    </div>
  ),
};

export const EmptyTodos: Story = {
  args: {
    goal: {
      ...Goal.goals[0],
      title: "목표를 추가하세요.",
      todoCount: 0,
      completedCount: 0,
    },
    todos: [],
  },
  render: (args) => (
    <div className="bg-primary-100 w-[400px]">
      <GoalCard {...args} />
    </div>
  ),
};
