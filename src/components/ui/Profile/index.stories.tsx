import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Profile, { ProfileVariant } from ".";

const meta: Meta<typeof Profile> = {
  title: "Components/Profile",
  component: Profile,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "surprised", "thinking", "excited", "love", "cheering", "greeting", "working", "sleepy"],
      description: "프로필 아이콘의 감정/상태 스타일을 선택합니다.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const AllVariants: Story = {
  render: () => {
    const variants: ProfileVariant[] = [
      "default",
      "surprised",
      "thinking",
      "excited",
      "love",
      "cheering",
      "greeting",
      "working",
      "sleepy",
    ];

    return (
      <div className="grid max-w-xl grid-cols-3 gap-6 rounded-xl bg-gray-50 p-6">
        {variants.map((v) => (
          <div
            key={v}
            className="flex flex-col items-center gap-2 rounded-lg bg-gray-200 p-32"
          >
            {/* 만든 Profile 컴포넌트 호출 */}
            <Profile variant={v} />
            <span className="mt-8 font-mono text-xs font-semibold text-black">{v}</span>
          </div>
        ))}
      </div>
    );
  },
};
