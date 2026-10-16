import { todoMutationOptions } from "./mutationOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** 할 일 생성 mutation */
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(todoMutationOptions.detail(queryClient));
};

/** 할 일 삭제 mutation */
export const useDeleteTodoMutation = (todoId: number) => {
  const queryClient = useQueryClient();
  return useMutation(todoMutationOptions.delete(queryClient, todoId));
};
