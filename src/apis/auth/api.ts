import { AUTH_API_PATH } from "@/constants";
import { serverFetcher } from "@/lib/axios/serverFetcher";
import {
  AuthResponse,
  AuthRefreshResponse,
  OAuthProvider,
  PostLoginRequest,
  PostLogoutRequest,
  PostOAuthRequest,
  PostRefreshRequest,
  PostSignupRequest,
} from "@/types/auth.types";

export const postSignup = (body: PostSignupRequest) =>
  serverFetcher<AuthResponse>(AUTH_API_PATH.signup, { method: "POST", data: body });

export const postLogin = (body: PostLoginRequest) =>
  serverFetcher<AuthResponse>(AUTH_API_PATH.login, { method: "POST", data: body });

export const postRefresh = (body: PostRefreshRequest) =>
  serverFetcher<AuthRefreshResponse>(AUTH_API_PATH.refresh, { method: "POST", data: body });

export const postLogout = (body: PostLogoutRequest) =>
  serverFetcher(AUTH_API_PATH.logout, { method: "POST", data: body });

export const postOAuth = (provider: OAuthProvider, body: PostOAuthRequest) =>
  serverFetcher<AuthResponse>(AUTH_API_PATH.oauth(provider), { method: "POST", data: body });
