import { uploadImage } from "@/apis/uploads";
import type { JSONContent } from "@tiptap/react";

const DATA_IMAGE_PATTERN = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/;
const ALLOWED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];
const MIME_TYPE_EXTENSIONS: Record<string, string> = {
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

interface EmbeddedImage {
  dataUrl: string;
  fileName: string;
}

interface NoteImageUploadResult {
  content: JSONContent;
  totalCount: number;
  uploadedCount: number;
  failedCount: number;
}

type NoteImageUploader = (file: File) => Promise<string>;

const getPreferredFileName = (node: JSONContent, index: number) => {
  const candidate = [node.attrs?.title, node.attrs?.alt].find(
    (value): value is string => typeof value === "string" && value.trim().length > 0,
  );

  return candidate?.trim() ?? `note-image-${index + 1}`;
};

const collectEmbeddedImages = (node: JSONContent, images: Map<string, EmbeddedImage>) => {
  const source = node.type === "image" && typeof node.attrs?.src === "string" ? node.attrs.src : "";

  if (source.startsWith("data:") && !images.has(source)) {
    images.set(source, {
      dataUrl: source,
      fileName: getPreferredFileName(node, images.size),
    });
  }

  node.content?.forEach((child) => collectEmbeddedImages(child, images));
};

const normalizeFileName = (fileName: string, mimeType: string) => {
  const extension = MIME_TYPE_EXTENSIONS[mimeType];
  if (!extension) throw new Error("지원하지 않는 이미지 형식입니다.");

  const currentExtension = fileName.split(".").pop()?.toLowerCase();
  const nameWithExtension =
    currentExtension && ALLOWED_IMAGE_EXTENSIONS.includes(currentExtension) ? fileName : `${fileName}.${extension}`;

  if (nameWithExtension.length <= 200) return nameWithExtension;

  const suffix = `.${extension}`;
  return `${nameWithExtension.slice(0, 200 - suffix.length)}${suffix}`;
};

const dataUrlToFile = ({ dataUrl, fileName }: EmbeddedImage) => {
  const match = DATA_IMAGE_PATTERN.exec(dataUrl);
  if (!match) throw new Error("이미지 데이터를 읽을 수 없습니다.");

  const [, mimeType, encodedData] = match;
  const binary = window.atob(encodedData);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return new File([bytes], normalizeFileName(fileName, mimeType), { type: mimeType });
};

const replaceUploadedImageSources = (node: JSONContent, uploadedUrls: Map<string, string>): JSONContent => {
  const nextNode: JSONContent = { ...node };
  const source = node.type === "image" && typeof node.attrs?.src === "string" ? node.attrs.src : "";
  const uploadedUrl = uploadedUrls.get(source);

  if (uploadedUrl) nextNode.attrs = { ...node.attrs, src: uploadedUrl };
  if (node.content) nextNode.content = node.content.map((child) => replaceUploadedImageSources(child, uploadedUrls));

  return nextNode;
};

/** Base64 이미지들을 병렬 업로드하고 성공한 이미지의 src만 실제 URL로 교체한다. */
export const uploadEmbeddedNoteImages = async (
  content: JSONContent,
  uploader: NoteImageUploader = uploadImage,
): Promise<NoteImageUploadResult> => {
  const embeddedImages = new Map<string, EmbeddedImage>();
  collectEmbeddedImages(content, embeddedImages);
  const images = [...embeddedImages.values()];

  if (images.length === 0) {
    return { content, totalCount: 0, uploadedCount: 0, failedCount: 0 };
  }

  const results = await Promise.allSettled(
    images.map(async (image) => ({ dataUrl: image.dataUrl, url: await uploader(dataUrlToFile(image)) })),
  );
  const uploadedUrls = new Map<string, string>();

  results.forEach((result) => {
    if (result.status === "fulfilled") uploadedUrls.set(result.value.dataUrl, result.value.url);
  });

  return {
    content: replaceUploadedImageSources(content, uploadedUrls),
    totalCount: images.length,
    uploadedCount: uploadedUrls.size,
    failedCount: images.length - uploadedUrls.size,
  };
};
