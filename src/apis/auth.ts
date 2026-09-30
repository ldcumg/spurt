import { API_PATH } from "@/constants";
import { serverFetcher } from "@/lib/axios/serverFetcher";
import { UserAuthItem } from "@/types/typeUsers";

type AuthResponse = { accessToken: string; refreshToken: string; user: UserAuthItem };
type AuthRefreshResponse = { accessToken: string; refreshToken?: string };

export const postSignup = (body: { email: string; name: string; password: string }) =>
  serverFetcher<AuthResponse>(API_PATH.auth.signup, { method: "POST", data: body });

export const postLogin = (body: { email: string; password: string }) =>
  serverFetcher<AuthResponse>(API_PATH.auth.login, { method: "POST", data: body });

export const postRefresh = (body: { refreshToken: string }) =>
  serverFetcher<AuthRefreshResponse>(API_PATH.auth.refresh, { method: "POST", data: body });

export const postLogout = (body: { refreshToken: string }) =>
  serverFetcher(API_PATH.auth.logout, { method: "POST", data: body });
