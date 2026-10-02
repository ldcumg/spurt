import { BACKEND_BASE_URL, TEAM_ID } from "@/config/env";

export const BASE_URL = {
  browser: "/api",
  server: `${BACKEND_BASE_URL}/${TEAM_ID}`,
} as const;

export const AUTH_API_PATH = {
  signup: "/auth/signup",
  login: "/auth/login",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
  oauth: (provider: string) => `/oauth/${provider}`,
} as const;

export const GOALS_API_PATH = {
  base: "/goals",
  detail: (goalId: string | number) => `/goals/${goalId}`,
} as const;

export const TODOS_API_PATH = {
  base: "/todos",
  favorites: "/todos/favorites",
  detail: (todoId: string | number) => `/todos/${todoId}`,
  favorite: (todoId: string | number) => `/todos/${todoId}/favorites`,
} as const;

export const NOTES_API_PATH = {
  base: "/notes",
  detail: (noteId: string | number) => `/notes/${noteId}`,
} as const;

export const NOTIFICATIONS_API_PATH = {
  base: "/notifications",
  detail: (notificationId: string | number) => `/notifications/${notificationId}`,
} as const;

export const USERS_API_PATH = {
  me: "/users/me",
  password: "/users/me/password",
  checkNickname: "/users/check-nickname",
} as const;

export const UPLOADS_API_PATH = {
  images: "/images",
  files: "/files",
} as const;
