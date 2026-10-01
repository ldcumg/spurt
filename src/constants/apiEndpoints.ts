export const AUTH_API_PATH = {
  signup: "/auth/signup",
  login: "/auth/login",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
} as const;

export const GOALS_API_PATH = {
  base: "/goals",
  detail: (goalId: number) => `/goals/${goalId}`,
} as const;

export const TODOS_API_PATH = {
  base: "/todos",
  favorites: "/todos/favorites",
  detail: (todoId: number) => `/todos/${todoId}`,
  favorite: (todoId: number) => `/todos/${todoId}/favorites`,
} as const;

export const NOTES_API_PATH = {
  base: "/notes",
  detail: (noteId: number) => `/notes/${noteId}`,
} as const;

export const NOTIFICATIONS_API_PATH = {
  base: "/notifications",
  detail: (notificationId: number) => `/notifications/${notificationId}`,
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
