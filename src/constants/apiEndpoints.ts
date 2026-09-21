import { API_BASE_URL } from "@/config/env";

const BASE_URL = `${API_BASE_URL}/4temp` as const;

export const GOAL_API_URLS = {
  list: `${BASE_URL}/goals`,
  detail: (goalId: string) => `/goals/${goalId}`,
} as const;
