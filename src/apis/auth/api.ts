import { AUTH_API_PATH } from "@/constants/apiEndpoints";
import { serverFetcher } from "@/lib/axios/serverFetcher";
import {
  AuthResponse,
  OAuthProvider,
  PostLoginRequest,
  PostLogoutRequest,
  PostOAuthRequest,
  PostSignupRequest,
} from "@/types/auth.types";

export const postSignup = (body: PostSignupRequest) =>
  serverFetcher<AuthResponse>(AUTH_API_PATH.signup, { method: "POST", data: body });

export const postLogin = (body: PostLoginRequest) =>
  serverFetcher<AuthResponse>(AUTH_API_PATH.login, { method: "POST", data: body });

export const postLogout = (body: PostLogoutRequest) =>
  serverFetcher(AUTH_API_PATH.logout, { method: "POST", data: body });

export const postOAuth = (provider: OAuthProvider, body: PostOAuthRequest) =>
  serverFetcher<AuthResponse>(AUTH_API_PATH.oauth(provider), { method: "POST", data: body });
