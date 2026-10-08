import { postGoal } from "@/apis/goals/api";
import GOAL_QUERY_KEYS from "@/constants/queryKeys/goal";
import { PostGoalRequest } from "@/types/goals.types";
import { mutationOptions, QueryClient } from "@tanstack/react-query";

export const goalMutationOptions = {
  detail: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (newGoal: PostGoalRequest) => postGoal(newGoal),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: GOAL_QUERY_KEYS.all });
      },
    }),
};
