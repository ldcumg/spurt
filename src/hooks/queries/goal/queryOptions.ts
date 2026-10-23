import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import GOAL_QUERY_KEYS from "@/constants/queryKeys/goal";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { GoalDetailResponse, GoalListResponse } from "@/types/goals.types";
import { queryOptions } from "@tanstack/react-query";

export const goalQueryOptions = {
  list: (params?: { cursor?: number | null; limit?: number }) =>
    queryOptions({
      queryKey: GOAL_QUERY_KEYS.list(params),
      queryFn: async (): Promise<GoalListResponse> => {
        const response = await clientFetcher.get<GoalListResponse>(GOALS_API_PATH.base, { params });
        return response.data;
      },
    }),
  detail: (goalId: string | number) =>
    queryOptions({
      queryKey: GOAL_QUERY_KEYS.detail(goalId),
      queryFn: async () => {
        const { data } = await clientFetcher.get<GoalDetailResponse>(GOALS_API_PATH.detail(goalId));
        return data;
      },
      enabled: !!goalId,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    }),
};
