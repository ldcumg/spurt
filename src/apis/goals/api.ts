import { GOALS_API_PATH } from "@/constants";
import { serverFetcher } from "@/lib/axios/serverFetcher";
import {
  GetGoalListParams,
  GoalDetailResponse,
  GoalResponse,
  GoalListResponse,
  PatchGoalRequest,
  PostGoalRequest,
} from "@/types/typeGoals";

export const getGoalList = (params?: GetGoalListParams) =>
  serverFetcher<GoalListResponse>(GOALS_API_PATH.base, { params });

export const postGoal = (body: PostGoalRequest) =>
  serverFetcher<GoalResponse>(GOALS_API_PATH.base, { method: "POST", data: body });

export const getGoalDetail = (goalId: number) => serverFetcher<GoalDetailResponse>(GOALS_API_PATH.detail(goalId));

export const patchGoal = (goalId: number, body: PatchGoalRequest) =>
  serverFetcher<GoalResponse>(GOALS_API_PATH.detail(goalId), { method: "PATCH", data: body });

export const deleteGoal = (goalId: number) => serverFetcher(GOALS_API_PATH.detail(goalId), { method: "DELETE" });
