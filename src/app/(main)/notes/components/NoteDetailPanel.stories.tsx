import NoteDetailPanel from "./NoteDetailPanel";
import { DISCLOSURE_ROOT_ID } from "@/constants/dom";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useState } from "react";
import { useArgs } from "storybook/preview-api";

function StoryWithDisclosureRoot(props: React.ComponentProps<typeof NoteDetailPanel>) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const readyTimer = window.setTimeout(() => setIsReady(true), 0);

    return () => window.clearTimeout(readyTimer);
  }, []);

  return (
    <>
      <div id={DISCLOSURE_ROOT_ID} />
      {isReady && <NoteDetailPanel {...props} />}
    </>
  );
}

const meta = {
  title: "pages/Notes/NoteDetailPanel",
  component: NoteDetailPanel,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => <StoryWithDisclosureRoot {...args} />,
} satisfies Meta<typeof NoteDetailPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

const editableNote = {
  id: 1,
  title: "프로젝트 회고 정리",
  description: "이번 프로젝트에서 배운 내용을 정리합니다.",
  goal: "프론트엔드 포트폴리오 완성하기",
  task: "회고 작성하기",
  date: "2026. 10. 13",
  tone: "mint" as const,
  content: {
    type: "doc",
    content: [{ type: "paragraph", content: [{ type: "text", text: "이번 프로젝트에서 배운 내용" }] }],
  },
  linkUrl: "https://example.com",
};

export const Editable: Story = {
  args: {
    note: editableNote,
    isOpen: true,
    onClose: () => {},
    onEdit: () => {},
  },
};

export const Loading: Story = {
  args: {
    note: null,
    isOpen: true,
    isLoading: true,
    onClose: () => {},
  },
};

export const ErrorWithRetry: Story = {
  args: {
    note: null,
    isOpen: true,
    isError: true,
    onClose: () => {},
    onRetry: () => {},
  },
  render: function Render(args) {
    const [{ isLoading, isError }, updateArgs] = useArgs();

    return (
      <StoryWithDisclosureRoot
        {...args}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => updateArgs({ isLoading: true, isError: false })}
      />
    );
  },
};

export const NotFound: Story = {
  args: {
    note: null,
    isOpen: true,
    isNotFound: true,
    onClose: () => {},
    onNotFoundClose: () => {},
  },
};
