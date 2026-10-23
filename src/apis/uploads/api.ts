import { UPLOADS_API_PATH } from "@/constants/apiEndpoints";
import type { Fetcher } from "@/types/api/fetcher.types";
import { PostFileUploadUrlRequest, PostImageUploadUrlRequest, UploadUrlResponse } from "@/types/uploads.types";

export const createUploadsApi = (fetcher: Fetcher) => ({
  postImageUploadUrl: (body: PostImageUploadUrlRequest) =>
    fetcher<UploadUrlResponse>(UPLOADS_API_PATH.images, { method: "POST", data: body }),

  postFileUploadUrl: (body: PostFileUploadUrlRequest) =>
    fetcher<UploadUrlResponse>(UPLOADS_API_PATH.files, { method: "POST", data: body }),
});
