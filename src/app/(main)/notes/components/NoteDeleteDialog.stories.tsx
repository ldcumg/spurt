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
    errorMessage: "노트를 삭제하지 못했어요. 잠시 후 다시 시도해 주세요.",
  },
};
