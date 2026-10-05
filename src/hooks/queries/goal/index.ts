import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import GOAL_QUERY_KEYS from "@/constants/queryKeys/goal";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { GoalListResponse } from "@/types/goals.types";
import { queryOptions } from "@tanstack/react-query";

// NOTE - 임시
export const goalQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: GOAL_QUERY_KEYS.all,
      queryFn: () => clientFetcher<GoalListResponse>(GOALS_API_PATH.base),
    }),
};
