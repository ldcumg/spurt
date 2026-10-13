import { createEmptyNoteContent } from "../../noteFormUtils";
import NoteEditor from "./NoteEditor";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { JSONContent } from "@tiptap/react";
import { useState } from "react";

const meta = {
  title: "Pages/Notes/NoteEditor",
  component: NoteEditor,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof NoteEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

function NoteEditorPreview({ isDisabled = false }: { isDisabled?: boolean }) {
  const [title, setTitle] = useState("이미지가 포함된 노트");
  const [content, setContent] = useState<JSONContent>(() => createEmptyNoteContent());

  return (
    <NoteEditor
      title={title}
      content={content}
      isDisabled={isDisabled}
      onTitleChange={setTitle}
      onContentChange={setContent}
    />
  );
}

export const Default: Story = {
  args: {
    title: "",
    content: createEmptyNoteContent(),
    onTitleChange: () => undefined,
    onContentChange: () => undefined,
  },
  render: () => <NoteEditorPreview />,
};

export const Submitting: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
  render: () => <NoteEditorPreview isDisabled />,
};
