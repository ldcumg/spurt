import { AUTH_API_PATH } from "./path";
import { serverFetcher } from "@/lib/axios/serverFetcher";
import { UserAuthItem } from "@/types/typeUsers";

type AuthResponse = { accessToken: string; refreshToken: string; user: UserAuthItem };
type AuthRefreshResponse = { accessToken: string; refreshToken?: string };

export const postSignup = (body: { email: string; name: string; password: string }) =>
  serverFetcher<AuthResponse>(AUTH_API_PATH.signup, { method: "POST", data: body });

export const postLogin = (body: { email: string; password: string }) =>
  serverFetcher<AuthResponse>(AUTH_API_PATH.login, { method: "POST", data: body });

export const postRefresh = (body: { refreshToken: string }) =>
  serverFetcher<AuthRefreshResponse>(AUTH_API_PATH.refresh, { method: "POST", data: body });

export const postLogout = (body: { refreshToken: string }) =>
  serverFetcher(AUTH_API_PATH.logout, { method: "POST", data: body });
