import { BASE_URL } from "@/config/env";

const BASE_URL_V1 = `${BASE_URL}/api/v1` as const;

export const $_API_URL = Object.freeze({
  $: `${BASE_URL_V1}/`,
} as const);
