import { todoHandlers } from "./handlers/todo";
import { buildClientApiUrl, createHandlers } from "./utils";
import { setupWorker } from "msw/browser";

const clientHandlers = [todoHandlers];

// 브라우저 Service Worker - development 환경에서 사용
export const mockWorker = setupWorker(...createHandlers(clientHandlers, buildClientApiUrl));
