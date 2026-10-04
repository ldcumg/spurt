import { todoHandlers } from "./handlers/todo";
import { buildServerApiUrl, createHandlers } from "./utils";
import { setupServer } from "msw/node";

const serverHandlers = [todoHandlers];

// Node interceptor - test 환경에서 사용
export const mockServer = setupServer(...createHandlers(serverHandlers, buildServerApiUrl));
