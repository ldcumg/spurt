import { UPLOADS_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PostImageUploadUrlRequest, UploadUrlResponse } from "@/types/uploads.types";

export const postImageUploadUrl = (body: PostImageUploadUrlRequest) =>
  clientFetcher.post<UploadUrlResponse>(UPLOADS_API_PATH.images, body);

export const uploadImage = async (file: File) => {
  const {
    data: { uploadUrl, url },
  } = await postImageUploadUrl({ fileName: file.name });
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`이미지 파일 업로드에 실패했습니다. (${response.status})`);
  }

  return url;
};
