import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import type { Fetcher } from "@/types/api/fetcher.types";
import {
  FavoriteTodoResponse,
  FavoriteTodoListResponse,
  GetFavoriteTodoListParams,
  GetTodoListParams,
  PatchTodoRequest,
  PostTodoRequest,
  TodoResponse,
  TodoListResponse,
} from "@/types/todos.types";

export const createTodosApi = (fetcher: Fetcher) => ({
  getTodoList: (params?: GetTodoListParams) => fetcher<TodoListResponse>(TODOS_API_PATH.base, { params }),

  postTodo: (body: PostTodoRequest) => fetcher<TodoResponse>(TODOS_API_PATH.base, { method: "POST", data: body }),

  getTodoDetail: (todoId: number) => fetcher<TodoResponse>(TODOS_API_PATH.detail(todoId)),

  patchTodo: (todoId: number, body: PatchTodoRequest) =>
    fetcher<TodoResponse>(TODOS_API_PATH.detail(todoId), { method: "PATCH", data: body }),

  deleteTodo: (todoId: number) => fetcher(TODOS_API_PATH.detail(todoId), { method: "DELETE" }),

  getFavoriteTodoList: (params?: GetFavoriteTodoListParams) =>
    fetcher<FavoriteTodoListResponse>(TODOS_API_PATH.favorites, { params }),

  postFavoriteTodo: (todoId: number) =>
    fetcher<FavoriteTodoResponse>(TODOS_API_PATH.favorite(todoId), { method: "POST" }),

  deleteFavoriteTodo: (todoId: number) => fetcher(TODOS_API_PATH.favorite(todoId), { method: "DELETE" }),
});
