import { todoMutationOptions } from "./mutationOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** 할 일 생성 또는 수정 mutation */
export const useSaveTodoMutation = (todoId?: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation(todoMutationOptions.save(queryClient, todoId));
};

/** 할 일 완료 상태 변경 mutation */
export const useToggleTodoDoneMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(todoMutationOptions.toggleDone(queryClient));
};

/** 할 일 수정 mutation */
export const useUpdateTodoMutation = (todoId: number) => {
  const queryClient = useQueryClient();
  return useMutation(todoMutationOptions.post(queryClient, todoId));
};

/** 할 일 삭제 mutation */
export const useDeleteTodoMutation = (todoId: number) => {
  const queryClient = useQueryClient();
  return useMutation(todoMutationOptions.delete(queryClient, todoId));
};
