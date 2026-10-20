import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PostTodoRequest, TodoResponse } from "@/types/todos.types";

export const postTodo = (body: PostTodoRequest) => clientFetcher.post<TodoResponse>(TODOS_API_PATH.base, body);
