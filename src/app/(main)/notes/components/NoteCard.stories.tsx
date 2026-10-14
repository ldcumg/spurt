import NoteCard from "./NoteCard";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "pages/Notes/NoteCard",
  component: NoteCard,
  parameters: {
    layout: "centered",
  },
  args: {
    note: {
      id: 1,
      title: "프로젝트 회고 정리",
      description: "이번 프로젝트에서 배운 내용과 다음에 개선할 점을 정리합니다.",
      goal: "프론트엔드 포트폴리오 완성하기",
      task: "회고 작성하기",
      date: "2026. 10. 13",
      tone: "mint",
      content: null,
      linkUrl: null,
    },
    onSelect: () => {},
    onDelete: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-360">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NoteCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const GoalLoading: Story = {
  args: {
    note: {
      ...meta.args.note,
      goal: "목표를 불러오는 중이에요.",
    },
  },
};

export const GoalLoadError: Story = {
  args: {
    note: {
      ...meta.args.note,
      goal: "목표 정보를 불러오지 못했어요.",
    },
  },
};
