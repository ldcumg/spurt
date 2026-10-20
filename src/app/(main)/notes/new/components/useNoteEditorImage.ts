"use client";

import { createNoteImageContent } from "./noteEditorImageContent";
import type { Editor, JSONContent } from "@tiptap/react";
import { useRef, useState, type ChangeEvent } from "react";

const MAX_IMAGE_SIZE_BYTES = 1024 * 1024;
const MAX_TOTAL_IMAGE_SIZE_BYTES = 3 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const ACCEPTED_IMAGE_TYPES = ALLOWED_IMAGE_TYPES.join(",");

interface UseNoteEditorImageParams {
  editor: Editor | null;
  isDisabled: boolean;
}

const getDataUrlSize = (dataUrl: string) => {
  const base64 = dataUrl.split(",")[1] ?? "";

  return Math.ceil((base64.length * 3) / 4);
};

const getEmbeddedImageSize = (node: JSONContent): number => {
  const ownSize = node.type === "image" && typeof node.attrs?.src === "string" ? getDataUrlSize(node.attrs.src) : 0;
  const childSize = node.content?.reduce((total, child) => total + getEmbeddedImageSize(child), 0) ?? 0;

  return ownSize + childSize;
};

export const useNoteEditorImage = ({ editor, isDisabled }: UseNoteEditorImageParams) => {
  const [imageError, setImageError] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const openImagePicker = () => {
    if (!editor || isDisabled) return;

    imageInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !editor || isDisabled) return;

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

      editor.chain().focus().insertContent(createNoteImageContent(reader.result, file.name)).run();
      setImageError("");
    };
    reader.onerror = () => setImageError("이미지를 불러오지 못했습니다.");
    reader.readAsDataURL(file);
  };

  return {
    acceptedImageTypes: ACCEPTED_IMAGE_TYPES,
    imageInputRef,
    imageError,
    openImagePicker,
    handleImageChange,
  };
};
