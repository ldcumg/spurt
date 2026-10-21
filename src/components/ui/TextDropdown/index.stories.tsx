import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextDropdown from ".";

const meta = {
  title: "components/TextDropdown",
  component: TextDropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    options: {
      control: { type: "object" },
    },
    layoutClassName: {},
    optionClassName: {},
  },
} satisfies Meta<typeof TextDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

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
    options: [
      {
        lable: "목표 제목 수정",
        onClick: () => {},
      },
      {
        lable: "다른 목표",
        onClick: () => {},
      },
    ],
  },
  render: (args) => (
    <Section title="">
      <div className="flex w-fit flex-row items-center gap-32 rounded-md bg-white p-16">
        <p>점 세개를 눌러 테스트 해보세요.</p>
        <TextDropdown
          {...args}
          layoutClassName=""
          optionClassName=""
        />
      </div>
    </Section>
  ),
};

export const Playground: Story = {
  args: {
    options: [
      { lable: "목표 제목 수정", onClick: () => {} },
      { lable: "목표 삭제", onClick: () => {} },
      { lable: "다른 목표 선택", onClick: () => {} },
    ],
  },
};
