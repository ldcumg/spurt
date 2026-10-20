"use client";

import { Link as LinkIcon, More, Upload } from "@/assets/icons";
import Button from "@/components/ui/Button";
import Select, { type SelectOption } from "@/components/ui/Select";
import type { Editor } from "@tiptap/react";
import { useEffect, useRef, useState, type ChangeEventHandler, type ReactNode, type RefObject } from "react";

const FORMAT_OPTIONS: SelectOption[] = [
  { value: "paragraph", label: "본문" },
  { value: "heading2", label: "제목 2" },
  { value: "heading3", label: "제목 3" },
];

interface ToolbarButtonProps {
  label: string;
  children: ReactNode;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  isDesktopOnly?: boolean;
}

export interface NoteEditorToolbarState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  isCode: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isBlockquote: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isLink: boolean;
}

interface NoteEditorToolbarProps {
  editor: Editor | null;
  state: NoteEditorToolbarState;
  isDisabled: boolean;
  acceptedImageTypes: string;
  imageInputRef: RefObject<HTMLInputElement | null>;
  onOpenImagePicker: () => void;
  onImageChange: ChangeEventHandler<HTMLInputElement>;
}

function ToolbarButton({ label, children, onClick, isActive, isDisabled, isDesktopOnly }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label={label}
      aria-pressed={isActive}
      title={label}
      disabled={isDisabled}
      onClick={onClick}
      className={`text-title-xs inline-flex shrink-0 items-center justify-center px-8 ${
        isActive ? "bg-primary-50 text-primary-600" : "text-neutral-800"
      } ${isDesktopOnly ? "hidden md:inline-flex" : ""}`}
    >
      {children}
    </Button>
  );
}

export default function NoteEditorToolbar({
  editor,
  state,
  isDisabled,
  acceptedImageTypes,
  imageInputRef,
  onOpenImagePicker,
  onImageChange,
}: NoteEditorToolbarProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const isEditorDisabled = !editor || isDisabled;
  const format = state.isHeading2 ? "heading2" : state.isHeading3 ? "heading3" : "paragraph";

  useEffect(() => {
    if (!isMoreOpen) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!moreMenuRef.current?.contains(event.target as Node)) setIsMoreOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMoreOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMoreOpen]);

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

  const moreActions = [
    { id: "underline", label: "밑줄", active: state.isUnderline },
    { id: "strike", label: "취소선", active: state.isStrike },
    { id: "code", label: "인라인 코드", active: state.isCode },
    { id: "link", label: "링크", active: state.isLink },
    { id: "image", label: "이미지 삽입", active: false },
    { id: "bulletList", label: "글머리 기호 목록", active: state.isBulletList },
    { id: "orderedList", label: "번호 목록", active: state.isOrderedList },
    { id: "blockquote", label: "인용문", active: state.isBlockquote },
  ] as const;

  const handleMoreAction = (actionId: (typeof moreActions)[number]["id"]) => {
    if (isDisabled) return;

    if (actionId === "underline") editor?.chain().focus().toggleUnderline().run();
    if (actionId === "strike") editor?.chain().focus().toggleStrike().run();
    if (actionId === "code") editor?.chain().focus().toggleCode().run();
    if (actionId === "link") handleLink();
    if (actionId === "image") onOpenImagePicker();
    if (actionId === "bulletList") editor?.chain().focus().toggleBulletList().run();
    if (actionId === "orderedList") editor?.chain().focus().toggleOrderedList().run();
    if (actionId === "blockquote") editor?.chain().focus().toggleBlockquote().run();
    setIsMoreOpen(false);
  };

  return (
    <div className="border-border relative flex items-center gap-2 overflow-visible border-b px-8 py-8">
      <Select
        label="서식"
        options={FORMAT_OPTIONS}
        value={format}
        disabled={isEditorDisabled}
        onChange={handleFormatChange}
        className="min-w-144 shrink-0 sm:min-w-160 [&>button]:h-36 [&>button]:rounded-lg [&>button]:border-0 [&>button]:shadow-none"
      />

      <span className="bg-border h-24 w-px shrink-0" />

      <ToolbarButton
        label="굵게"
        isActive={state.isBold}
        isDisabled={isEditorDisabled}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        label="기울임"
        isActive={state.isItalic}
        isDisabled={isEditorDisabled}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        label="밑줄"
        isActive={state.isUnderline}
        isDisabled={isEditorDisabled}
        isDesktopOnly
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </ToolbarButton>
      <ToolbarButton
        label="취소선"
        isActive={state.isStrike}
        isDisabled={isEditorDisabled}
        isDesktopOnly
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <span className="line-through">S</span>
      </ToolbarButton>
      <ToolbarButton
        label="인라인 코드"
        isActive={state.isCode}
        isDisabled={isEditorDisabled}
        isDesktopOnly
        onClick={() => editor?.chain().focus().toggleCode().run()}
      >
        <span aria-hidden>&lt;&gt;</span>
      </ToolbarButton>

      <span className="bg-border hidden h-24 w-px shrink-0 md:block" />

      <ToolbarButton
        label="링크"
        isActive={state.isLink}
        isDisabled={isEditorDisabled}
        isDesktopOnly
        onClick={handleLink}
      >
        <LinkIcon className="size-18" />
      </ToolbarButton>
      <ToolbarButton
        label="이미지 삽입"
        isDisabled={isEditorDisabled}
        isDesktopOnly
        onClick={onOpenImagePicker}
      >
        <Upload className="size-18" />
      </ToolbarButton>
      <input
        ref={imageInputRef}
        type="file"
        accept={acceptedImageTypes}
        className="hidden"
        disabled={isDisabled}
        onChange={onImageChange}
      />
      <ToolbarButton
        label="글머리 기호 목록"
        isActive={state.isBulletList}
        isDisabled={isEditorDisabled}
        isDesktopOnly
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <span aria-hidden>☷</span>
      </ToolbarButton>
      <ToolbarButton
        label="번호 목록"
        isActive={state.isOrderedList}
        isDisabled={isEditorDisabled}
        isDesktopOnly
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <span aria-hidden>☰</span>
      </ToolbarButton>
      <ToolbarButton
        label="인용문"
        isActive={state.isBlockquote}
        isDisabled={isEditorDisabled}
        isDesktopOnly
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      >
        <span aria-hidden>❝</span>
      </ToolbarButton>

      <div
        ref={moreMenuRef}
        className="relative ml-auto md:hidden"
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="더보기"
          aria-haspopup="menu"
          aria-expanded={isMoreOpen}
          disabled={isEditorDisabled}
          onClick={() => setIsMoreOpen((open) => !open)}
          className="text-neutral-800"
        >
          <More className="size-18" />
        </Button>

        {isMoreOpen && !isDisabled && (
          <div
            role="menu"
            aria-label="추가 편집 기능"
            className="border-input-border bg-surface-card absolute top-[calc(100%+8px)] right-0 z-50 min-w-176 rounded-xl border p-4 shadow-lg"
          >
            {moreActions.map((action) => (
              <button
                key={action.label}
                type="button"
                role="menuitem"
                onClick={() => handleMoreAction(action.id)}
                className={`text-body-md hover:bg-primary-50 hover:text-primary-700 flex h-40 w-full items-center rounded-lg px-12 text-left transition-colors ${
                  action.active ? "bg-primary-100 text-primary-700 font-semibold" : "text-neutral-700"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
