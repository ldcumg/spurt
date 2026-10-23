import GoalCard from ".";
import { MockGoalList, Todos } from "@/mocks/goalCard.mock";
import { useState } from "react";
import { TodoResponse } from "@/types/todos.types";
import { GoalListItem } from "@/types/goals.types";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/GoalCard",
  component: GoalCard,
  parameters: {
    layout: "centered",
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-primary-100 flex w-[400px] flex-col gap-12 p-12">
      <h3 className="text-title-md text-neutral-900">{title}</h3>
      {children}
    </section>
  );
}

/**
 * 💡 스토리북 내부에서 독립적으로 투두 토글을 지원하는 래퍼 컴포넌트
 */
function InteractiveGoalCard({ goal, todos = [] }: { goal: GoalListItem; todos?: TodoResponse[] }) {
  const [todoList, setTodoList] = useState<TodoResponse[]>(todos);

  const handleToggle = (id: number) => {
    setTodoList((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  return (
    <GoalCard
      goal={goal}
      todos={todoList}
      onToggle={handleToggle}
    />
  );
}

export const AllStates: Story = {
  args: {
    goal: {
      ...MockGoalList.goals[0],
      title: MockGoalList.goals[0].title,
      todoCount: MockGoalList.goals[0].todoCount,
      completedCount: MockGoalList.goals[0].completedCount,
    },
    todos: Todos.todos.map((todo) => ({ ...todo, done: todo.done })),
  },
  render: (args) => {
    const allTodos = args.todos ?? [];
    return (
      <div className="flex flex-row gap-16">
        <Section title="할일 3개 (최대치)">
          <InteractiveGoalCard
            {...args}
            todos={allTodos.slice(0, 3)}
          />
        </Section>
        <Section title="할일 2개">
          <InteractiveGoalCard
            {...args}
            todos={allTodos.slice(0, 2)}
          />
        </Section>
        <Section title="할일 0개">
          <InteractiveGoalCard
            {...args}
            todos={[]}
          />
        </Section>
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    goal: {
      ...MockGoalList.goals[0],
      title: MockGoalList.goals[0].title,
      todoCount: MockGoalList.goals[0].todoCount,
      completedCount: MockGoalList.goals[0].completedCount,
    },
    todos: Todos.todos.map((todo) => ({ ...todo, done: todo.done })),
  },
  render: (args) => (
    <div className="w-400">
      <Section title="default">
        <InteractiveGoalCard {...args} />
      </Section>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    goal: {
      ...MockGoalList.goals[0],
      title: MockGoalList.goals[0].title,
      todoCount: MockGoalList.goals[0].todoCount,
      completedCount: MockGoalList.goals[0].completedCount,
    },
    todos: Todos.todos.map((todo) => ({ ...todo, done: todo.done })),
  },
  render: ({ goal, todos }) => {
    return (
      <Section title="Test Here (You can change goal title and todo title.)">
        <InteractiveGoalCard
          goal={goal}
          todos={todos}
        />
      </Section>
    );
  },
};
