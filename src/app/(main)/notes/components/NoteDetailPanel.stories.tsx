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
