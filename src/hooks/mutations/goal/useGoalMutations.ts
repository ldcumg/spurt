import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goalMutationOptions } from ".";

export const useAddGoalMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(goalMutationOptions.create(queryClient));
};

export const useUpdateGoalMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(goalMutationOptions.update(queryClient));
};

export const useDeleteGoalMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(goalMutationOptions.delete(queryClient));
};
