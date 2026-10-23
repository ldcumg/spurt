import { createUsersApi } from "@/apis/users/api";
import { serverFetcher } from "@/lib/axios/serverFetcher";

export const { getMe, patchMe, deleteMe, patchPassword, getCheckNickname } = createUsersApi(serverFetcher);
