import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import GOAL_QUERY_KEYS from "@/constants/queryKeys/goal";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { PostGoalRequest } from "@/types/goals.types";
import { mutationOptions, type QueryClient } from "@tanstack/react-query";

export const goalMutationOptions = {
  detail: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (newGoal: PostGoalRequest) => clientFetcher.post(GOALS_API_PATH.base, newGoal),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: GOAL_QUERY_KEYS.all });
      },
    }),
};
