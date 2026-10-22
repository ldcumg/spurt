import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { GoalListItem, GoalResponse, PatchGoalRequest, PostGoalRequest } from "@/types/goals.types";

export const postGoal = (body: PostGoalRequest) => clientFetcher.post<GoalListItem>(GOALS_API_PATH.base, body);

export const patchGoal = (goalId: number, body: PatchGoalRequest) =>
  clientFetcher.patch<GoalResponse>(GOALS_API_PATH.detail(goalId), body);

export const deleteGoal = (goalId: number) => clientFetcher.delete(GOALS_API_PATH.detail(goalId));
