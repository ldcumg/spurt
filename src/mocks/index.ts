import { todoHandlers } from "./handlers/todo";
import { setupServer } from "msw/node";

// handler 생성 시 추가
export const mockServer = setupServer(...todoHandlers);
