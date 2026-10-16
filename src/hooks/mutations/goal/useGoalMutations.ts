import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goalMutationOptions } from ".";

export const useAddGoalMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(goalMutationOptions.detail(queryClient));
};
