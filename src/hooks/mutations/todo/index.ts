import { postTodo } from "@/apis/todos";
import TODO_QUERY_KEYS from "@/constants/queryKeys/todo";
import type { PostTodoRequest } from "@/types/todos.types";
import { mutationOptions, type QueryClient } from "@tanstack/react-query";

export const todoMutationOptions = {
  detail: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: async (newTodo: PostTodoRequest) => {
        const response = await postTodo(newTodo);

        return response.data;
      },
      onSuccess: (todo) => {
        queryClient.setQueryData(TODO_QUERY_KEYS.detail(todo.id), todo);
        void queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.all });
      },
    }),
};
