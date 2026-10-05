import { UPLOADS_API_PATH } from "@/constants/apiEndpoints";
import { serverFetcher } from "@/lib/axios/serverFetcher";
import { PostFileUploadUrlRequest, PostImageUploadUrlRequest, UploadUrlResponse } from "@/types/uploads.types";

export const postImageUploadUrl = (body: PostImageUploadUrlRequest) =>
  serverFetcher<UploadUrlResponse>(UPLOADS_API_PATH.images, { method: "POST", data: body });

export const postFileUploadUrl = (body: PostFileUploadUrlRequest) =>
  serverFetcher<UploadUrlResponse>(UPLOADS_API_PATH.files, { method: "POST", data: body });
