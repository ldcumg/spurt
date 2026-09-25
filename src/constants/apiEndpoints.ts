import { API_BASE_URL } from "@/config/env";

const BASE_URL = `${API_BASE_URL}/tempTeamId` as const;

export const GOAL_API_URLS = {
  list: `${BASE_URL}/goals`,
  detail: (goalId: string) => `/goals/${goalId}`,
} as const;

export const TODO_API_URLS = {
  list: `${BASE_URL}/todos`,
  detail: (todoId: string) => `/todos/${todoId}`,
};

export const UPLOAD_API_URLS = {
  file: `${BASE_URL}/files`,
  images: `${BASE_URL}/images`,
};
