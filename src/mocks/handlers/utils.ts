import { BASE_URL } from "@/constants";

/** Backend API URL 생성 */
export function buildBackendApiUrl(path: string) {
  return `${BASE_URL.server}${path}`;
}
