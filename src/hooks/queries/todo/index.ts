import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import TODO_QUERY_KEYS from "@/constants/queryKeys";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { TodoListResponse, TodoResponse } from "@/types/todos.types";
import { queryOptions, type QueryClient } from "@tanstack/react-query";

export const todoQueryOptions = {
  all: (queryClient: QueryClient) =>
    queryOptions({
      queryKey: TODO_QUERY_KEYS.all,
      queryFn: async () => {
        // TODO - status 처리
        const { data, status: _status } = await clientFetcher<TodoListResponse>(TODOS_API_PATH.base);
        const { todos } = data;
        // todo id 별로 캐싱
        for (const todo of todos) {
          queryClient.setQueryData(TODO_QUERY_KEYS.detail(todo.id), todo);
        }

        return data;
      },
    }),
  detail: (todoId: string) =>
    queryOptions({
      queryKey: TODO_QUERY_KEYS.detail(todoId),
      queryFn: () => clientFetcher<TodoResponse>(TODOS_API_PATH.detail(todoId)),
    }),
};
