import { createTodosApi } from "@/apis/todos/api";
import { serverFetcher } from "@/lib/axios/serverFetcher";

export const {
  getTodoList,
  postTodo,
  getTodoDetail,
  patchTodo,
  deleteTodo,
  getFavoriteTodoList,
  postFavoriteTodo,
  deleteFavoriteTodo,
} = createTodosApi(serverFetcher);
