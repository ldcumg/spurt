import { goalHandlers } from "./handlers/goal";
import { todoHandlers } from "./handlers/todo";
import { userHandlers } from "./handlers/user";
import { buildClientApiUrl, createHandlers } from "./utils";
import { setupWorker } from "msw/browser";

const clientHandlers = [todoHandlers, goalHandlers, userHandlers];

// 브라우저 Service Worker - development 환경에서 사용
export const mockWorker = setupWorker(...createHandlers(clientHandlers, buildClientApiUrl));
