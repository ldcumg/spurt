import TextInput from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "components/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextInput>;

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
  render: () => (
    <div className="flex w-xs flex-col gap-60">
      <Section title="Default">
        <TextInput
          label="이메일"
          placeholder="이메일을 입력하세요"
        />
      </Section>
      <Section title="Error">
        <TextInput
          label="이메일"
          placeholder="이메일을 입력하세요"
          error="유효한 이메일 형식이 아닙니다"
        />
      </Section>
      <Section title="Disabled">
        <TextInput
          label="이메일"
          placeholder="이메일을 입력하세요"
          disabled
        />
      </Section>
      <Section title="No Label">
        <TextInput placeholder="이메일을 입력하세요" />
      </Section>
      <Section title="Password">
        <TextInput
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          type="password"
        />
      </Section>
    </div>
  ),
};

export const Playground: Story = {
  args: { label: "이메일", placeholder: "이메일을 입력하세요" },
};
