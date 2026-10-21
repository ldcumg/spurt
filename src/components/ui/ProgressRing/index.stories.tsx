import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProgressRing from ".";

const meta: Meta<typeof ProgressRing> = {
  title: "components/ProgressRing",
  component: ProgressRing,
  parameters: {
    layout: "centered",
  },
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

type Story = StoryObj<typeof ProgressRing>;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-12">
      <h3 className="text-title-md text-neutral-900">{title}</h3>
      {children}
    </section>
  );
}

export const AllStates: Story = {
  render: ({}) => {
    return (
      <div className="w-lg gap-40 bg-white p-20">
        <Section title="0%">
          <ProgressRing
            doneCount={0}
            totalCount={10}
          />
        </Section>
        <Section title="50%">
          <ProgressRing
            doneCount={5}
            totalCount={10}
          />
        </Section>
        <Section title="89%">
          <ProgressRing
            doneCount={17}
            totalCount={19}
          />
        </Section>
        <Section title="100%">
          <ProgressRing
            doneCount={10}
            totalCount={10}
          />
        </Section>
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    doneCount: 5,
    totalCount: 10,
  },
  render: ({ doneCount, totalCount }) => (
    <div className="w-lg gap-40 bg-white p-20">
      <Section title="default (50%)">
        <ProgressRing
          doneCount={doneCount}
          totalCount={totalCount}
        />
      </Section>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    doneCount: 5,
    totalCount: 10,
  },
  render: ({ doneCount, totalCount }) => (
    <div className="w-700 gap-40 bg-white p-20">
      <Section title={`Test Here (You can change the value of doneCount and totalCount.)`}>
        <p>percentage = doneCount / totalCount * 100</p>
        <ProgressRing
          doneCount={doneCount}
          totalCount={totalCount}
        />
      </Section>
    </div>
  ),
};
