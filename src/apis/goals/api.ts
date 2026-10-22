import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import type { Fetcher } from "@/types/api/fetcher.types";
import {
  GetGoalListParams,
  GoalDetailResponse,
  GoalResponse,
  GoalListResponse,
  PatchGoalRequest,
  PostGoalRequest,
} from "@/types/goals.types";

export const createGoalsApi = (fetcher: Fetcher) => ({
  getGoalList: (params?: GetGoalListParams) => fetcher<GoalListResponse>(GOALS_API_PATH.base, { params }),

  postGoal: (body: PostGoalRequest) => fetcher<GoalResponse>(GOALS_API_PATH.base, { method: "POST", data: body }),

  getGoalDetail: (goalId: number) => fetcher<GoalDetailResponse>(GOALS_API_PATH.detail(goalId)),

  patchGoal: (goalId: number, body: PatchGoalRequest) =>
    fetcher<GoalResponse>(GOALS_API_PATH.detail(goalId), { method: "PATCH", data: body }),

  deleteGoal: (goalId: number) => fetcher(GOALS_API_PATH.detail(goalId), { method: "DELETE" }),
});
