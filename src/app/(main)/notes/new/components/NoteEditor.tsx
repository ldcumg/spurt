"use client";

import { createNoteExtensions, NOTE_CONTENT_CLASS_NAME } from "../../components/NoteContent";
import { Link as LinkIcon, More, NoteFilled, Upload } from "@/assets/icons";
import Button from "@/components/ui/Button";
import Select, { type SelectOption } from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { EditorContent, useEditor, useEditorState, type JSONContent } from "@tiptap/react";
import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";

const MAX_IMAGE_SIZE_BYTES = 1024 * 1024;
const MAX_TOTAL_IMAGE_SIZE_BYTES = 3 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

interface ToolbarButtonProps {
  label: string;
  children: ReactNode;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  isDesktopOnly?: boolean;
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

const getDataUrlSize = (dataUrl: string) => {
  const base64 = dataUrl.split(",")[1] ?? "";
  return Math.ceil((base64.length * 3) / 4);
};

const getEmbeddedImageSize = (node: JSONContent): number => {
  const ownSize = node.type === "image" && typeof node.attrs?.src === "string" ? getDataUrlSize(node.attrs.src) : 0;
  return ownSize + (node.content?.reduce((total, child) => total + getEmbeddedImageSize(child), 0) ?? 0);
};

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

interface NoteEditorProps {
  title: string;
  content: JSONContent;
  onTitleChange: (title: string) => void;
  onContentChange: (content: JSONContent, plainText: string) => void;
}

export default function NoteEditor({ title, content, onTitleChange, onContentChange }: NoteEditorProps) {
  const [imageError, setImageError] = useState("");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: createNoteExtensions(),
    content,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onContentChange(currentEditor.getJSON(), currentEditor.getText());
    },
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !editor) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageError("PNG, JPEG, WebP, GIF 이미지만 추가할 수 있습니다.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setImageError("이미지 한 장은 1MB 이하만 추가할 수 있습니다.");
      return;
    }

    if (getEmbeddedImageSize(editor.getJSON()) + file.size > MAX_TOTAL_IMAGE_SIZE_BYTES) {
      setImageError("노트에 포함된 이미지의 전체 용량은 3MB를 넘을 수 없습니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setImageError("이미지를 불러오지 못했습니다.");
        return;
      }

      editor
        .chain()
        .focus()
        .insertContent({ type: "image", attrs: { src: reader.result, alt: file.name, title: file.name } })
        .run();
      setImageError("");
    };
    reader.onerror = () => setImageError("이미지를 불러오지 못했습니다.");
    reader.readAsDataURL(file);
  };

  const moreActions = [
    {
      id: "underline",
      label: "밑줄",
      active: state.isUnderline,
    },
    {
      id: "strike",
      label: "취소선",
      active: state.isStrike,
    },
    {
      id: "code",
      label: "인라인 코드",
      active: state.isCode,
    },
    { id: "link", label: "링크", active: state.isLink },
    { id: "image", label: "이미지 삽입", active: false },
    {
      id: "bulletList",
      label: "글머리 기호 목록",
      active: state.isBulletList,
    },
    {
      id: "orderedList",
      label: "번호 목록",
      active: state.isOrderedList,
    },
    {
      id: "blockquote",
      label: "인용문",
      active: state.isBlockquote,
    },
  ] as const;

  const handleMoreAction = (actionId: (typeof moreActions)[number]["id"]) => {
    if (actionId === "underline") editor?.chain().focus().toggleUnderline().run();
    if (actionId === "strike") editor?.chain().focus().toggleStrike().run();
    if (actionId === "code") editor?.chain().focus().toggleCode().run();
    if (actionId === "link") handleLink();
    if (actionId === "image") imageInputRef.current?.click();
    if (actionId === "bulletList") editor?.chain().focus().toggleBulletList().run();
    if (actionId === "orderedList") editor?.chain().focus().toggleOrderedList().run();
    if (actionId === "blockquote") editor?.chain().focus().toggleBlockquote().run();
    setIsMoreOpen(false);
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
          onChange={(event) => onTitleChange(event.target.value)}
        />
        <span className="text-caption pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 text-neutral-500">
          {title.length}/50
        </span>
      </div>

      <div className="border-input-border overflow-hidden rounded-lg border bg-white">
        <div className="border-border relative flex items-center gap-2 overflow-visible border-b px-8 py-8">
          <Select
            label="서식"
            options={FORMAT_OPTIONS}
            value={format}
            disabled={!editor}
            onChange={handleFormatChange}
            className="min-w-144 shrink-0 sm:min-w-160 [&>button]:h-36 [&>button]:rounded-lg [&>button]:border-0 [&>button]:shadow-none"
          />

          <span className="bg-border h-24 w-px shrink-0" />

          <ToolbarButton
            label="굵게"
            isActive={state.isBold}
            isDisabled={!editor}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            label="기울임"
            isActive={state.isItalic}
            isDisabled={!editor}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            label="밑줄"
            isActive={state.isUnderline}
            isDisabled={!editor}
            isDesktopOnly
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <span className="underline">U</span>
          </ToolbarButton>
          <ToolbarButton
            label="취소선"
            isActive={state.isStrike}
            isDisabled={!editor}
            isDesktopOnly
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <span className="line-through">S</span>
          </ToolbarButton>
          <ToolbarButton
            label="인라인 코드"
            isActive={state.isCode}
            isDisabled={!editor}
            isDesktopOnly
            onClick={() => editor?.chain().focus().toggleCode().run()}
          >
            <span aria-hidden>&lt;&gt;</span>
          </ToolbarButton>

          <span className="bg-border hidden h-24 w-px shrink-0 md:block" />

          <ToolbarButton
            label="링크"
            isActive={state.isLink}
            isDisabled={!editor}
            isDesktopOnly
            onClick={handleLink}
          >
            <LinkIcon className="size-18" />
          </ToolbarButton>
          <ToolbarButton
            label="이미지 삽입"
            isDisabled={!editor}
            isDesktopOnly
            onClick={() => imageInputRef.current?.click()}
          >
            <Upload className="size-18" />
          </ToolbarButton>
          <input
            ref={imageInputRef}
            type="file"
            accept={ALLOWED_IMAGE_TYPES.join(",")}
            className="hidden"
            onChange={handleImageChange}
          />
          <ToolbarButton
            label="글머리 기호 목록"
            isActive={state.isBulletList}
            isDisabled={!editor}
            isDesktopOnly
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <span aria-hidden>☷</span>
          </ToolbarButton>
          <ToolbarButton
            label="번호 목록"
            isActive={state.isOrderedList}
            isDisabled={!editor}
            isDesktopOnly
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <span aria-hidden>☰</span>
          </ToolbarButton>
          <ToolbarButton
            label="인용문"
            isActive={state.isBlockquote}
            isDisabled={!editor}
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
              disabled={!editor}
              onClick={() => setIsMoreOpen((open) => !open)}
              className="text-neutral-800"
            >
              <More className="size-18" />
            </Button>

            {isMoreOpen && (
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

        <div className="relative min-h-320 md:min-h-420 xl:min-h-460">
          {state.isEmpty && (
            <p className="text-body-lg text-placeholder pointer-events-none absolute top-20 left-16 z-10 md:left-20">
              이곳에 노트 내용을 작성해주세요.
            </p>
          )}
          <EditorContent
            editor={editor}
            className={`${NOTE_CONTENT_CLASS_NAME} [&_.tiptap]:min-h-320 [&_.tiptap]:px-16 [&_.tiptap]:py-20 md:[&_.tiptap]:min-h-420 md:[&_.tiptap]:px-20 md:[&_.tiptap]:py-24 xl:[&_.tiptap]:min-h-460`}
          />
        </div>

        <footer className="border-border flex min-h-48 items-center justify-between gap-12 border-t bg-neutral-50 px-16 py-8 md:px-20">
          {imageError && (
            <p
              role="alert"
              className="text-caption text-error"
            >
              {imageError}
            </p>
          )}
          <p className="text-caption shrink-0 text-right text-neutral-500">
            공백포함 {state.text.length}자 <span className="mx-6">|</span> 공백제외 {textWithoutSpaces.length}자
          </p>
        </footer>
      </div>
    </section>
  );
}
