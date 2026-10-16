import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import TODO_QUERY_KEYS from "@/constants/queryKeys/todo";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PatchTodoRequest, PostTodoRequest } from "@/types/todos.types";
import { mutationOptions, type QueryClient } from "@tanstack/react-query";

export const todoMutationOptions = {
  save: (queryClient: QueryClient, todoId: number | undefined) =>
    mutationOptions({
      mutationFn: (todoData: PatchTodoRequest | PostTodoRequest) =>
        todoId
          ? clientFetcher.patch(TODOS_API_PATH.detail(todoId), todoData)
          : clientFetcher.post(TODOS_API_PATH.base, todoData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.all });
      },
    }),
  post: (queryClient: QueryClient, todoId: number) =>
    mutationOptions({
      mutationFn: (todoData: PostTodoRequest) => clientFetcher.post(TODOS_API_PATH.detail(todoId), todoData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.all });
      },
    }),
  delete: (queryClient: QueryClient, todoId: number) =>
    mutationOptions({
      mutationFn: () => clientFetcher.delete(TODOS_API_PATH.detail(todoId)),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.all });
      },
    }),
};
