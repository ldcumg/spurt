import { USERS_API_PATH } from "@/constants";
import { serverFetcher } from "@/lib/axios/serverFetcher";
import { GetCheckNicknameParams, PatchMeRequest, PatchPasswordRequest, UserResponse } from "@/types/users.types";

export const getMe = () => serverFetcher<UserResponse>(USERS_API_PATH.me);

export const patchMe = (body: PatchMeRequest) =>
  serverFetcher<UserResponse>(USERS_API_PATH.me, { method: "PATCH", data: body });

export const deleteMe = () => serverFetcher(USERS_API_PATH.me, { method: "DELETE" });

export const patchPassword = (body: PatchPasswordRequest) =>
  serverFetcher<{ message: string }>(USERS_API_PATH.password, { method: "PATCH", data: body });

export const getCheckNickname = (params: GetCheckNicknameParams) =>
  serverFetcher<{ available: boolean }>(USERS_API_PATH.checkNickname, { params });
