import { todoHandlers } from "./handlers/todo";
import { setupServer } from "msw/node";

const mockHandlers = [todoHandlers];

// Node interceptor - test 환경에서 사용
export const mockServer = setupServer(...mockHandlers.flat());
