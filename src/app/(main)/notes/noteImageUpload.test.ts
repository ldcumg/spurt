import { uploadEmbeddedNoteImages } from "./noteImageUpload";
import type { JSONContent } from "@tiptap/react";
import { describe, expect, it, vi } from "vitest";

const PNG_DATA_URL = "data:image/png;base64,aGVsbG8=";
const WEBP_DATA_URL = "data:image/webp;base64,d29ybGQ=";

const createContent = (): JSONContent => ({
  type: "doc",
  content: [
    { type: "image", attrs: { src: PNG_DATA_URL, alt: "first.png", title: "first.png" } },
    { type: "paragraph", content: [{ type: "text", text: "이미지 사이의 본문" }] },
    { type: "image", attrs: { src: WEBP_DATA_URL, alt: "second.webp", title: "second.webp" } },
  ],
});

const getImageSources = (content: JSONContent) =>
  content.content
    ?.filter((node) => node.type === "image")
    .map((node) => (typeof node.attrs?.src === "string" ? node.attrs.src : "")) ?? [];

describe("uploadEmbeddedNoteImages", () => {
  it("Base64 이미지들을 병렬 업로드하고 실제 URL로 교체한다", async () => {
    const uploader = vi.fn(async (file: File) => `https://cdn.example.com/${file.name}`);

    const result = await uploadEmbeddedNoteImages(createContent(), uploader);

    expect(uploader).toHaveBeenCalledTimes(2);
    expect(uploader.mock.calls.map(([file]) => [file.name, file.type])).toEqual([
      ["first.png", "image/png"],
      ["second.webp", "image/webp"],
    ]);
    expect(result).toMatchObject({ totalCount: 2, uploadedCount: 2, failedCount: 0 });
    expect(getImageSources(result.content)).toEqual([
      "https://cdn.example.com/first.png",
      "https://cdn.example.com/second.webp",
    ]);
  });

  it("일부 업로드가 실패하면 성공한 이미지만 URL로 교체한다", async () => {
    const uploader = vi.fn(async (file: File) => {
      if (file.type === "image/webp") throw new Error("upload failed");
      return `https://cdn.example.com/${file.name}`;
    });

    const result = await uploadEmbeddedNoteImages(createContent(), uploader);

    expect(result).toMatchObject({ totalCount: 2, uploadedCount: 1, failedCount: 1 });
    expect(getImageSources(result.content)).toEqual(["https://cdn.example.com/first.png", WEBP_DATA_URL]);

    const retryUploader = vi.fn(async (file: File) => `https://cdn.example.com/retry-${file.name}`);
    const retryResult = await uploadEmbeddedNoteImages(result.content, retryUploader);

    expect(retryUploader).toHaveBeenCalledOnce();
    expect(retryResult).toMatchObject({ totalCount: 1, uploadedCount: 1, failedCount: 0 });
    expect(getImageSources(retryResult.content)).toEqual([
      "https://cdn.example.com/first.png",
      "https://cdn.example.com/retry-second.webp",
    ]);
  });

  it("같은 Base64 이미지가 여러 번 있으면 한 번만 업로드한다", async () => {
    const content: JSONContent = {
      type: "doc",
      content: [
        { type: "image", attrs: { src: PNG_DATA_URL, title: "same.png" } },
        { type: "image", attrs: { src: PNG_DATA_URL, title: "same.png" } },
      ],
    };
    const uploader = vi.fn(async () => "https://cdn.example.com/same.png");

    const result = await uploadEmbeddedNoteImages(content, uploader);

    expect(uploader).toHaveBeenCalledOnce();
    expect(getImageSources(result.content)).toEqual([
      "https://cdn.example.com/same.png",
      "https://cdn.example.com/same.png",
    ]);
  });

  it("Base64 이미지가 없으면 업로드하지 않고 기존 본문을 반환한다", async () => {
    const content: JSONContent = {
      type: "doc",
      content: [{ type: "image", attrs: { src: "https://cdn.example.com/saved.png" } }],
    };
    const uploader = vi.fn(async () => "unused");

    const result = await uploadEmbeddedNoteImages(content, uploader);

    expect(uploader).not.toHaveBeenCalled();
    expect(result).toEqual({ content, totalCount: 0, uploadedCount: 0, failedCount: 0 });
  });
});
