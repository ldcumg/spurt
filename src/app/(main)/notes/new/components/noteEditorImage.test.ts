import { createNoteExtensions } from "../../components/NoteContent";
import { createImageInsertionContent } from "./noteEditorImage";
import { Editor } from "@tiptap/react";
import { describe, expect, it } from "vitest";

const getImageSources = (editor: Editor) =>
  editor
    .getJSON()
    .content?.filter((node) => node.type === "image")
    .map((node) => node.attrs?.src) ?? [];

describe("createImageInsertionContent", () => {
  it("이미지를 연속으로 삽입해도 이전 이미지를 교체하지 않는다", () => {
    const editor = new Editor({
      extensions: createNoteExtensions(),
      content: { type: "doc", content: [{ type: "paragraph" }] },
    });

    editor.commands.insertContent(createImageInsertionContent("data:image/png;base64,first", "first.png"));
    editor.commands.insertContent(createImageInsertionContent("data:image/png;base64,second", "second.png"));

    expect(getImageSources(editor)).toEqual([
      "data:image/png;base64,first",
      "data:image/png;base64,second",
    ]);
    expect(editor.getJSON().content?.at(-1)).toEqual({ type: "paragraph" });

    editor.destroy();
  });
});
