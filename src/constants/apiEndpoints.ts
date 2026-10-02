import { BACKEND_BASE_URL, TEAM_ID } from "@/config/env";

export const BASE_URL = {
  browser: "/api",
  server: `${BACKEND_BASE_URL}/${TEAM_ID}`,
} as const;

export const API_PATH = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  todos: {
    base: "/todos",
    favorites: "/todos/favorites",
    detail: (todoId: number) => `/todos/${todoId}`,
    favorite: (todoId: number) => `/todos/${todoId}/favorites`,
  },
  goals: {
    base: "/goals",
    detail: (goalId: number) => `/goals/${goalId}`,
  },
  notes: {
    base: "/notes",
    detail: (noteId: number) => `/notes/${noteId}`,
  },
  notifications: {
    base: "/notifications",
    detail: (notificationId: number) => `/notifications/${notificationId}`,
  },
  users: {
    me: "/users/me",
    password: "/users/me/password",
    checkNickname: "/users/check-nickname",
  },
  images: "/images",
  files: "/files",
} as const;
