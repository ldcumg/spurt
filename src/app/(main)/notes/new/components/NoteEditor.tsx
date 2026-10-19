"use client";

import { createNoteExtensions, NOTE_CONTENT_CLASS_NAME } from "../../components/NoteContent";
import NoteEditorToolbar from "./NoteEditorToolbar";
import { useNoteEditorImage } from "./useNoteEditorImage";
import { NoteFilled } from "@/assets/icons";
import TextInput from "@/components/ui/TextInput";
import { EditorContent, useEditor, useEditorState, type JSONContent } from "@tiptap/react";
import { useEffect, useRef } from "react";

const MAX_NOTE_TITLE_LENGTH = 100;

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

interface NoteEditorProps {
  title: string;
  content: JSONContent;
  isDisabled?: boolean;
  onTitleChange: (title: string) => void;
  onContentChange: (content: JSONContent, plainText: string) => void;
}

export default function NoteEditor({
  title,
  content,
  isDisabled = false,
  onTitleChange,
  onContentChange,
}: NoteEditorProps) {
  const lastEmittedContentRef = useRef<JSONContent | null>(null);

  const editor = useEditor({
    extensions: createNoteExtensions(),
    content,
    editable: !isDisabled,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      const nextContent = currentEditor.getJSON();
      lastEmittedContentRef.current = nextContent;
      onContentChange(nextContent, currentEditor.getText());
    },
    editorProps: {
      attributes: {
        "aria-label": "노트 본문",
        "aria-multiline": "true",
        role: "textbox",
      },
    },
  });
  const { acceptedImageTypes, imageInputRef, imageError, openImagePicker, handleImageChange } = useNoteEditorImage({
    editor,
    isDisabled,
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
  const textWithoutSpaces = state.text.replace(/\s/g, "");

  useEffect(() => {
    if (!editor) return;

    if (lastEmittedContentRef.current === content) {
      lastEmittedContentRef.current = null;
      return;
    }

    editor.commands.setContent(content, { emitUpdate: false });
  }, [content, editor]);

  useEffect(() => {
    editor?.setEditable(!isDisabled, false);
  }, [editor, isDisabled]);

  return (
    <section
      aria-label="노트 편집기"
      aria-busy={isDisabled}
      className="border-border bg-surface-card rounded-xl border p-16 shadow-sm md:p-20"
    >
      <div className="[&_input]:text-title-sm relative mb-16 [&_input]:h-64 [&_input]:pr-64 [&_input]:pl-80">
        <span className="bg-mint-light text-mint pointer-events-none absolute top-1/2 left-16 z-10 flex size-48 -translate-y-1/2 items-center justify-center rounded-lg">
          <NoteFilled className="size-24" />
        </span>
        <TextInput
          aria-label="노트 제목"
          value={title}
          maxLength={MAX_NOTE_TITLE_LENGTH}
          placeholder="노트의 제목을 입력해주세요."
          disabled={isDisabled}
          onChange={(event) => onTitleChange(event.target.value)}
        />
        <span className="text-caption pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 text-neutral-500">
          {title.length}/{MAX_NOTE_TITLE_LENGTH}
        </span>
      </div>

      <div className="border-input-border overflow-hidden rounded-lg border bg-white">
        <NoteEditorToolbar
          editor={editor}
          state={state}
          isDisabled={isDisabled}
          acceptedImageTypes={acceptedImageTypes}
          imageInputRef={imageInputRef}
          onOpenImagePicker={openImagePicker}
          onImageChange={handleImageChange}
        />

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
