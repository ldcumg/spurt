import { BASE_URL } from "@/constants/apiEndpoints";
import type { HttpHandler } from "msw";

/** client api url 생성 */
export function buildClientApiUrl(path: string) {
  return `${BASE_URL.client}${path}`;
}
/** backend api url 생성 */
export function buildServerApiUrl(path: string) {
  return `${BASE_URL.server}${path}`;
}

/** url 빌더를 각 핸들러에 전달하고 하나의 배열로 합침 */
export function createHandlers(
  handlers: ((buildApiUrl: (path: string) => string) => HttpHandler[])[],
  buildApiUrl: (path: string) => string,
): HttpHandler[] {
  return handlers.flatMap((handler) => handler(buildApiUrl));
}
