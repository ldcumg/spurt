import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import GOAL_QUERY_KEYS from "@/constants/queryKeys/goal";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { GoalDetailResponse, GoalResponse, type GoalListResponse } from "@/types/goals.types";
import { QueryClient, queryOptions } from "@tanstack/react-query";

// NOTE - 임시
export const goalQueryOptions = {
  list: (queryClient: QueryClient, params?: { cursor?: number | null; limit?: number }) =>
    queryOptions({
      queryKey: GOAL_QUERY_KEYS.list(params),
      queryFn: async () => {
        const response = await clientFetcher.get<GoalListResponse>(GOALS_API_PATH.base, { params });
        const { goals } = response.data;

        for (const goal of goals) {
          queryClient.setQueryData<GoalDetailResponse>(GOAL_QUERY_KEYS.detail(goal.id), (prevDetail) => {
            if (prevDetail) {
              return { ...prevDetail, title: goal.title };
            }
          });
          return {
            id: goal.id,
            teamId: goal.teamId,
            userId: goal.userId,
            title: goal.title,
            createdAt: goal.createdAt,
            updatedAt: goal.updatedAt,
            todos: [],
          };
        }

        return response.data;
      },
    }),
  detail: (goalId: string | number) =>
    queryOptions({
      queryKey: GOAL_QUERY_KEYS.detail(goalId),
      queryFn: () => clientFetcher.get<GoalResponse>(GOALS_API_PATH.detail(goalId)),
    }),
};
