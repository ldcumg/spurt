import Badge from ".";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Badge> = {
  title: "components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["todo", "done", "goal", "category"],
      description: "뱃지 종류",
    },
    todoCount: { control: "number", description: "할 일의 갯수" },
    doneCount: { control: "number", description: "완료한 일의 갯수" },
    totalCount: { control: "number", description: "총 할 일의 갯수" },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-12">
      <h3 className="text-title-md text-neutral-900">{title}</h3>
      {children}
    </section>
  );
}

export const AllStates: Story = {
  args: {
    type: "todo",
    className: "",
  },
  render: () => (
    <div className="flex flex-row gap-160">
      <div className="flex flex-col gap-40">
        <Section title="todo">
          <Badge
            type="todo"
            className=""
          />
        </Section>
        <Section title="done">
          <Badge
            type="done"
            className=""
          />
        </Section>
        <Section title="goal">
          <Badge
            type="goal"
            className=""
          />
        </Section>
        <Section title="category">
          <Badge
            type="category"
            className=""
          />
        </Section>
      </div>
      <div className="flex flex-col gap-40">
        <Section title="todo with count">
          <Badge
            type="todo"
            todoCount={12}
            className=""
          />
        </Section>
        <Section title="done with count">
          <Badge
            type="done"
            doneCount={1130}
            className=""
          />
        </Section>
      </div>
    </div>
  ),
};

export const Default: Story = {
  args: {
    type: "todo",
  },
};

export const Playground: Story = {
  args: {
    type: "todo",
  },
  render: ({ type, todoCount, doneCount, totalCount }) => (
    <Section title="Test Here (You can set type and count.)">
      <Badge
        type={type}
        todoCount={todoCount}
        doneCount={doneCount}
        totalCount={totalCount}
      />
    </Section>
  ),
};
