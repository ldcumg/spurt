import { TODOS_API_PATH } from "@/constants/apiEndpoints";
import TODO_QUERY_KEYS from "@/constants/queryKeys/todo";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PatchTodoRequest, PostTodoRequest, TodoListResponse, TodoResponse } from "@/types/todos.types";
import type { AxiosResponse } from "axios";
import { mutationOptions, type QueryClient } from "@tanstack/react-query";

export const todoMutationOptions = {
  toggleDone: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: ({ todoId, done }: { todoId: number; done: boolean }) =>
        clientFetcher.patch<TodoResponse>(TODOS_API_PATH.detail(todoId), { done }),
      onMutate: async ({ todoId, done }) => {
        await queryClient.cancelQueries({ queryKey: TODO_QUERY_KEYS.all });
        const previousTodos = queryClient.getQueryData<AxiosResponse<TodoListResponse>>(TODO_QUERY_KEYS.all);

        queryClient.setQueryData<AxiosResponse<TodoListResponse>>(TODO_QUERY_KEYS.all, (previous) =>
          previous
            ? {
                ...previous,
                data: {
                  ...previous.data,
                  todos: previous.data.todos.map((todo) => (todo.id === todoId ? { ...todo, done } : todo)),
                },
              }
            : previous,
        );

        return { previousTodos };
      },
      onError: (_error, _variables, context) => {
        if (context?.previousTodos) {
          queryClient.setQueryData(TODO_QUERY_KEYS.all, context.previousTodos);
        }
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.all }),
    }),
  save: (queryClient: QueryClient, todoId: number | undefined) =>
    mutationOptions({
      mutationFn: (todoData: PatchTodoRequest | PostTodoRequest) =>
        todoId
          ? clientFetcher.patch(TODOS_API_PATH.detail(todoId), todoData)
          : clientFetcher.post(TODOS_API_PATH.base, todoData),
      onSuccess: () => {
        return queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.all });
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
