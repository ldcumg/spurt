import { TODOS_API_PATH } from "@/constants";
import { serverFetcher } from "@/lib/axios/serverFetcher";
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

export const getTodoList = (params?: GetTodoListParams) =>
  serverFetcher<TodoListResponse>(TODOS_API_PATH.base, { params });

export const postTodo = (body: PostTodoRequest) =>
  serverFetcher<TodoResponse>(TODOS_API_PATH.base, { method: "POST", data: body });

export const getTodoDetail = (todoId: number) => serverFetcher<TodoResponse>(TODOS_API_PATH.detail(todoId));

export const patchTodo = (todoId: number, body: PatchTodoRequest) =>
  serverFetcher<TodoResponse>(TODOS_API_PATH.detail(todoId), { method: "PATCH", data: body });

export const deleteTodo = (todoId: number) => serverFetcher(TODOS_API_PATH.detail(todoId), { method: "DELETE" });

export const getFavoriteTodoList = (params?: GetFavoriteTodoListParams) =>
  serverFetcher<FavoriteTodoListResponse>(TODOS_API_PATH.favorites, { params });

export const postFavoriteTodo = (todoId: number) =>
  serverFetcher<FavoriteTodoResponse>(TODOS_API_PATH.favorite(todoId), { method: "POST" });

export const deleteFavoriteTodo = (todoId: number) =>
  serverFetcher(TODOS_API_PATH.favorite(todoId), { method: "DELETE" });
