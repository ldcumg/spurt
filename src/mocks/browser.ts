import { todoHandlers } from "./handlers/todo";
import { setupWorker } from "msw/browser";

// 브라우저 Service Worker - development 환경에서 사용
export const mockWorker = setupWorker(...todoHandlers);
