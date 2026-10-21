import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import TODO_QUERY_KEYS from "@/constants/queryKeys/todo";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PostTodoRequest } from "@/types/todos.types";
import { mutationOptions, type QueryClient } from "@tanstack/react-query";

export const todoMutationOptions = {
  detail: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (newTodo: PostTodoRequest) => clientFetcher.post(TODOS_API_PATH.base, newTodo),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.all });
      },
    }),
};
