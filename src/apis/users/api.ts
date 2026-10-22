import { USERS_API_PATH } from "@/constants/apiEndpoints";
import type { Fetcher } from "@/types/api/fetcher.types";
import { GetCheckNicknameParams, PatchMeRequest, PatchPasswordRequest, UserResponse } from "@/types/users.types";

export const createUsersApi = (fetcher: Fetcher) => ({
  getMe: () => fetcher<UserResponse>(USERS_API_PATH.me),

  patchMe: (body: PatchMeRequest) => fetcher<UserResponse>(USERS_API_PATH.me, { method: "PATCH", data: body }),

  deleteMe: () => fetcher(USERS_API_PATH.me, { method: "DELETE" }),

  patchPassword: (body: PatchPasswordRequest) =>
    fetcher<{ message: string }>(USERS_API_PATH.password, { method: "PATCH", data: body }),

  getCheckNickname: (params: GetCheckNicknameParams) =>
    fetcher<{ available: boolean }>(USERS_API_PATH.checkNickname, { params }),
});
