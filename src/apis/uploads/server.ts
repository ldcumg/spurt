import { createUploadsApi } from "@/apis/uploads/api";
import { serverFetcher } from "@/lib/axios/serverFetcher";

export const { postImageUploadUrl, postFileUploadUrl } = createUploadsApi(serverFetcher);
