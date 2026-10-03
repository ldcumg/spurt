import { TODOS_API_PATH } from "@/constants";
import TODO_QUERY_KEYS from "@/constants/queryKeys";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { queryOptions, type QueryClient } from "@tanstack/react-query";

export const todoQueryOptions = {
  all: (queryClient: QueryClient) =>
    queryOptions({
      queryKey: TODO_QUERY_KEYS.all,
      queryFn: async () => {
        const response = await clientFetcher(TODOS_API_PATH.base);
        const { todos } = response.data;

        for (const todo of todos) {
          queryClient.setQueryData(TODO_QUERY_KEYS.detail(todo.id), todo);
        }

        return response;
      },
    }),
  detail: (todoId: string) =>
    queryOptions({
      queryKey: TODO_QUERY_KEYS.detail(todoId),
      queryFn: () => clientFetcher(TODOS_API_PATH.detail(todoId)),
    }),
};
