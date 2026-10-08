import { UPLOADS_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PostFileUploadUrlRequest, UploadUrlResponse } from "@/types/uploads.types";

export const postFileUploadUrl = (body: PostFileUploadUrlRequest) =>
  clientFetcher.post<UploadUrlResponse>(UPLOADS_API_PATH.files, body);
