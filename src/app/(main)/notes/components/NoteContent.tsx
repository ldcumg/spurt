"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface NoteContentProps {
  content: JSONContent;
  className?: string;
}

export const NOTE_CONTENT_CLASS_NAME = [
  "[&_.tiptap]:text-body-lg [&_.tiptap]:text-neutral-800 [&_.tiptap]:outline-none",
  "[&_.tiptap_p+p]:mt-16",
  "[&_.tiptap_h2]:text-title-md [&_.tiptap_h2]:mt-28 [&_.tiptap_h2]:mb-12",
  "[&_.tiptap_h3]:text-title-sm [&_.tiptap_h3]:mt-24 [&_.tiptap_h3]:mb-8",
  "[&_.tiptap_ul]:my-12 [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-24",
  "[&_.tiptap_ol]:my-12 [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-24",
  "[&_.tiptap_li+li]:mt-6",
  "[&_.tiptap_blockquote]:border-primary-300 [&_.tiptap_blockquote]:my-12 [&_.tiptap_blockquote]:border-l-[3px] [&_.tiptap_blockquote]:pl-12 [&_.tiptap_blockquote]:text-neutral-600",
  "[&_.tiptap_a]:text-information [&_.tiptap_a]:underline",
  "[&_.tiptap_img]:mx-auto [&_.tiptap_img]:my-24 [&_.tiptap_img]:block [&_.tiptap_img]:max-h-[480px] [&_.tiptap_img]:max-w-full [&_.tiptap_img]:rounded-xl [&_.tiptap_img]:object-contain",
].join(" ");

export const createNoteExtensions = () => [
  StarterKit.configure({ link: false, underline: false }),
  Underline,
  Link.configure({ openOnClick: false, autolink: true }),
  Image.configure({ inline: false, allowBase64: true }),
];

/** TipTap 문서를 작성 화면과 동일한 스타일로 읽기 전용 렌더링한다. */
export default function NoteContent({ content, className = "" }: NoteContentProps) {
  const editor = useEditor(
    {
      extensions: createNoteExtensions(),
      content,
      editable: false,
      immediatelyRender: false,
    },
    [content],
  );

  return (
    <EditorContent
      editor={editor}
      className={`${NOTE_CONTENT_CLASS_NAME} ${className}`}
    />
  );
}
