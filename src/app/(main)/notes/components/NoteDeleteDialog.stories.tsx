import NoteDeleteDialog from "./NoteDeleteDialog";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";

const meta = {
  title: "pages/Notes/NoteDeleteDialog",
  component: NoteDeleteDialog,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    noteTitle: "프로젝트 회고 정리",
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
  },
} satisfies Meta<typeof NoteDeleteDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <NoteDeleteDialog
        {...args}
        onClose={() => updateArgs({ isOpen: false })}
        onConfirm={() => updateArgs({ isDeleting: true })}
      />
    );
  },
};

export const Error: Story = {
  args: {
    errorTitle: "이 노트를 삭제할 권한이 없어요.",
    errorMessage: "로그인한 계정과 데이터의 소유권을 확인해 주세요.",
  },
};
