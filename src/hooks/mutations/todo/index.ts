import { postTodo } from "@/apis/todos";
import TODO_QUERY_KEYS from "@/constants/queryKeys/todo";
import type { PostTodoRequest } from "@/types/todos.types";
import { mutationOptions, type QueryClient } from "@tanstack/react-query";

export const todoMutationOptions = {
  detail: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (newTodo: PostTodoRequest) => postTodo(newTodo),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.all });
      },
    }),
};
