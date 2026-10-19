import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import GOAL_QUERY_KEYS from "@/constants/queryKeys/goal";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { GoalResponse, type GoalListResponse } from "@/types/goals.types";
import { QueryClient, queryOptions } from "@tanstack/react-query";

// NOTE - 임시
export const goalQueryOptions = {
  all: (queryClient: QueryClient) =>
    queryOptions({
      queryKey: GOAL_QUERY_KEYS.all,
      queryFn: async () => {
        const response = await clientFetcher.get<GoalListResponse>(GOALS_API_PATH.base);
        const {
          data: { goals },
        } = response;
        for (const goal of goals) {
          queryClient.setQueryData(GOAL_QUERY_KEYS.detail(goal.id), goal);
        }
      },
    }),
  detail: (goalId: string | number) =>
    queryOptions({
      queryKey: GOAL_QUERY_KEYS.detail(goalId),
      queryFn: () => clientFetcher.get<GoalResponse>(GOALS_API_PATH.detail(goalId)),
    }),
};
