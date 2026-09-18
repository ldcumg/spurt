import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TodoItem from ".";
import { Goal, Todos } from "../GoalCard/mock";

{
  /**
    id: number;
      teamId: string;
      userId: number;
      goalId: number;
      title: string;
      done: boolean;
      fileUrl: string | null;
      linkUrl: string | null;
      createdAt: string;
      updatedAt: string;
      goal: TodoGoalSummary;
      noteIds: number[]; */
}

const meta = {
  title: "components/TodoItem",
  component: TodoItem,
  tags: ["autodocs"],
  argTypes: {
    todo: {
      description: "할 일",
      control: "object",
    },
  },
} satisfies Meta<typeof TodoItem>;

export default meta;

type Story = StoryObj<typeof TodoItem>;

export const All_States: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <p>*호버도 테스트 해보세요</p>
      <h1>(Todo)</h1>
      <TodoItem todo={Todos.todos[3]} />
      <h1>(Done)</h1>
      <TodoItem todo={Todos.todos[1]} />
      <h1>Test (truncate)</h1>
      <TodoItem todo={Todos.todos[0]} />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    todo: {
      ...Todos.todos[3],
      title: Todos.todos[3].title,
      done: Todos.todos[3].done,
      fileUrl: Todos.todos[3].fileUrl,
      linkUrl: Todos.todos[3].linkUrl,
      noteIds: Todos.todos[3].noteIds,
      goal: Todos.todos[3].goal,
    },
  },
};
