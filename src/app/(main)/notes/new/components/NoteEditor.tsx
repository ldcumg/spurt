"use client";

import { Link as LinkIcon, More, NoteFilled } from "@/assets/icons";
import Button from "@/components/ui/Button";
import Select, { type SelectOption } from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import LinkExtension from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, type ReactNode } from "react";

interface ToolbarButtonProps {
  label: string;
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  desktopOnly?: boolean;
}

const FORMAT_OPTIONS: SelectOption[] = [
  { value: "paragraph", label: "본문" },
  { value: "heading2", label: "제목 2" },
  { value: "heading3", label: "제목 3" },
];

const EMPTY_EDITOR_STATE = {
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrike: false,
  isCode: false,
  isBulletList: false,
  isOrderedList: false,
  isBlockquote: false,
  isHeading2: false,
  isHeading3: false,
  isLink: false,
  text: "",
  isEmpty: true,
};

function ToolbarButton({ label, children, onClick, active, disabled, desktopOnly }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label={label}
      aria-pressed={active}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`text-title-xs inline-flex shrink-0 items-center justify-center px-8 ${
        active ? "bg-primary-50 text-primary-600" : "text-neutral-800"
      } ${desktopOnly ? "hidden md:inline-flex" : ""}`}
    >
      {children}
    </Button>
  );
}

export default function NoteEditor() {
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false, underline: false }),
      Underline,
      LinkExtension.configure({ openOnClick: false, autolink: true }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        "aria-label": "노트 본문",
        "aria-multiline": "true",
        role: "textbox",
      },
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor) return EMPTY_EDITOR_STATE;

      return {
        isBold: currentEditor.isActive("bold"),
        isItalic: currentEditor.isActive("italic"),
        isUnderline: currentEditor.isActive("underline"),
        isStrike: currentEditor.isActive("strike"),
        isCode: currentEditor.isActive("code"),
        isBulletList: currentEditor.isActive("bulletList"),
        isOrderedList: currentEditor.isActive("orderedList"),
        isBlockquote: currentEditor.isActive("blockquote"),
        isHeading2: currentEditor.isActive("heading", { level: 2 }),
        isHeading3: currentEditor.isActive("heading", { level: 3 }),
        isLink: currentEditor.isActive("link"),
        text: currentEditor.getText(),
        isEmpty: currentEditor.isEmpty,
      };
    },
  });

  const state = editorState ?? EMPTY_EDITOR_STATE;
  const format = state.isHeading2 ? "heading2" : state.isHeading3 ? "heading3" : "paragraph";
  const textWithoutSpaces = state.text.replace(/\s/g, "");

  const handleFormatChange = (value: string) => {
    if (!editor) return;
    if (value === "heading2") editor.chain().focus().setHeading({ level: 2 }).run();
    else if (value === "heading3") editor.chain().focus().setHeading({ level: 3 }).run();
    else editor.chain().focus().setParagraph().run();
  };

  const handleLink = () => {
    if (!editor) return;

    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: "https://tiptap.dev" }).run();
  };

  return (
    <section
      aria-label="노트 편집기"
      className="border-border bg-surface-card rounded-xl border p-16 shadow-sm md:p-20"
    >
      <div className="[&_input]:text-title-sm relative mb-16 [&_input]:h-64 [&_input]:pr-64 [&_input]:pl-80">
        <span className="bg-mint-light text-mint pointer-events-none absolute top-1/2 left-16 z-10 flex size-48 -translate-y-1/2 items-center justify-center rounded-lg">
          <NoteFilled className="size-24" />
        </span>
        <TextInput
          aria-label="노트 제목"
          value={title}
          maxLength={50}
          placeholder="노트의 제목을 입력해주세요."
          onChange={(event) => setTitle(event.target.value)}
        />
        <span className="text-caption pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 text-neutral-500">
          {title.length}/50
        </span>
      </div>

      <div className="border-input-border overflow-hidden rounded-lg border bg-white">
        <div className="border-border flex [scrollbar-width:none] items-center gap-2 overflow-x-auto border-b px-8 py-8 [&::-webkit-scrollbar]:hidden">
          <Select
            label="서식"
            options={FORMAT_OPTIONS}
            value={format}
            disabled={!editor}
            onChange={handleFormatChange}
            className="min-w-160 shrink-0 [&>button]:h-36 [&>button]:rounded-lg [&>button]:border-0 [&>button]:shadow-none"
          />

          <span className="bg-border h-24 w-px shrink-0" />

          <ToolbarButton
            label="굵게"
            active={state.isBold}
            disabled={!editor}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            label="기울임"
            active={state.isItalic}
            disabled={!editor}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            label="밑줄"
            active={state.isUnderline}
            disabled={!editor}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <span className="underline">U</span>
          </ToolbarButton>
          <ToolbarButton
            label="취소선"
            active={state.isStrike}
            disabled={!editor}
            desktopOnly
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <span className="line-through">S</span>
          </ToolbarButton>
          <ToolbarButton
            label="인라인 코드"
            active={state.isCode}
            disabled={!editor}
            desktopOnly
            onClick={() => editor?.chain().focus().toggleCode().run()}
          >
            <span aria-hidden>&lt;&gt;</span>
          </ToolbarButton>

          <span className="bg-border h-24 w-px shrink-0" />

          <ToolbarButton
            label="링크"
            active={state.isLink}
            disabled={!editor}
            onClick={handleLink}
          >
            <LinkIcon className="size-18" />
          </ToolbarButton>
          <ToolbarButton
            label="글머리 기호 목록"
            active={state.isBulletList}
            disabled={!editor}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <span aria-hidden>☷</span>
          </ToolbarButton>
          <ToolbarButton
            label="번호 목록"
            active={state.isOrderedList}
            disabled={!editor}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <span aria-hidden>☰</span>
          </ToolbarButton>
          <ToolbarButton
            label="인용문"
            active={state.isBlockquote}
            disabled={!editor}
            desktopOnly
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <span aria-hidden>❝</span>
          </ToolbarButton>
          <ToolbarButton
            label="더보기"
            onClick={() => undefined}
          >
            <More className="size-18" />
          </ToolbarButton>
        </div>

        <div className="relative min-h-320 md:min-h-420 xl:min-h-460">
          {state.isEmpty && (
            <p className="text-body-lg text-placeholder pointer-events-none absolute top-20 left-16 z-10 md:left-20">
              이곳에 노트 내용을 작성해주세요.
            </p>
          )}
          <EditorContent
            editor={editor}
            className="[&_.tiptap]:text-body-lg [&_.tiptap_a]:text-information [&_.tiptap_blockquote]:border-primary-300 [&_.tiptap_h2]:text-title-md [&_.tiptap_h3]:text-title-sm [&_.tiptap]:min-h-320 [&_.tiptap]:px-16 [&_.tiptap]:py-20 [&_.tiptap]:text-neutral-800 [&_.tiptap]:outline-none md:[&_.tiptap]:min-h-420 md:[&_.tiptap]:px-20 md:[&_.tiptap]:py-24 xl:[&_.tiptap]:min-h-460 [&_.tiptap_a]:underline [&_.tiptap_blockquote]:my-12 [&_.tiptap_blockquote]:border-l-[3px] [&_.tiptap_blockquote]:pl-12 [&_.tiptap_blockquote]:text-neutral-600 [&_.tiptap_h2]:mb-12 [&_.tiptap_h3]:mb-8 [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-24 [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-24"
          />
        </div>

        <footer className="border-border flex justify-end border-t bg-neutral-50 px-16 py-12 md:px-20">
          <p className="text-caption shrink-0 text-right text-neutral-500">
            공백포함 {state.text.length}자 <span className="mx-6">|</span> 공백제외 {textWithoutSpaces.length}자
          </p>
        </footer>
      </div>
    </section>
  );
}
