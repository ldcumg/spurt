import { todoMutationOptions } from ".";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** 전체 todo 요청 쿼리 */
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(todoMutationOptions.detail(queryClient));
};
