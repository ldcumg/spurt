import DraftRestoreModal from "./DraftRestoreModal";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";

const meta = {
  title: "pages/Notes/DraftRestoreModal",
  component: DraftRestoreModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isOpen: true,
    draftTitle: "프로젝트 회고 정리",
    savedAt: "2026-10-14T06:30:00.000Z",
    onSkip: () => {},
    onRestore: () => {},
  },
} satisfies Meta<typeof DraftRestoreModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <DraftRestoreModal
        {...args}
        onSkip={() => updateArgs({ isOpen: false })}
        onRestore={() => updateArgs({ isOpen: false })}
      />
    );
  },
};

export const Untitled: Story = {
  args: {
    draftTitle: "",
  },
  render: Default.render,
};

export const LongTitle: Story = {
  args: {
    draftTitle: "사용자 인터뷰 결과와 다음 스프린트에서 개선해야 할 기능을 우선순위별로 정리한 프로젝트 회고 노트",
  },
  render: Default.render,
};

export const LoadingOptions: Story = {
  args: {
    isRestoreDisabled: true,
  },
  render: Default.render,
};
