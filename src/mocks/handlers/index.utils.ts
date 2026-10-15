import { BASE_URL } from "@/constants/apiEndpoints";

/** backend api url 생성 */
export function buildApiUrl(path: string) {
  return `${BASE_URL.server}${path}`;
}
