import type { JSONContent } from "@tiptap/react";

/** 이미지 뒤에 커서가 머물 빈 문단을 함께 만들어 연속 삽입 시 기존 이미지 교체를 막는다. */
export const createImageInsertionContent = (src: string, fileName: string): JSONContent[] => [
  {
    type: "image",
    attrs: { src, alt: fileName, title: fileName },
  },
  { type: "paragraph" },
];
