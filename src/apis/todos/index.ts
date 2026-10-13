import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PostTodoRequest } from "@/types/todos.types";

export const postTodo = (body: PostTodoRequest) => clientFetcher.post(TODOS_API_PATH.base, body);
