import { todoQueryOptions } from ".";
import { useQuery, type QueryClient } from "@tanstack/react-query";

/** 전체 todo 요청 쿼리 */
export const useAllTodoQuery = (queryClient: QueryClient) => {
  return useQuery(todoQueryOptions.all(queryClient));
};

/** 특정 todo 요청 쿼리 */
export const useTodoDetailQuery = (todoId: string) => {
  return useQuery(todoQueryOptions.detail(todoId));
};
