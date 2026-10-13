import NotesList from "./NotesList";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "pages/Notes/NotesList",
  component: NotesList,
  parameters: {
    layout: "padded",
  },
  args: {
    notes: [],
    onNoteSelect: () => {},
    onNoteDelete: () => {},
  },
} satisfies Meta<typeof NotesList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Forbidden: Story = {
  args: {
    isError: true,
    errorTitle: "노트 목록을 볼 권한이 없어요.",
    errorMessage: "로그인한 계정과 데이터의 소유권을 확인해 주세요.",
    canRetry: false,
  },
};

export const ServerError: Story = {
  args: {
    isError: true,
    errorTitle: "노트 목록을 불러오지 못했어요.",
    errorMessage: "서버에 일시적인 문제가 생겼어요. 잠시 후 다시 시도해 주세요.",
    canRetry: true,
    onRetry: () => {},
  },
};
