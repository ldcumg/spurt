import { createGoalsApi } from "@/apis/goals/api";
import { serverFetcher } from "@/lib/axios/serverFetcher";

export const { getGoalList, postGoal, getGoalDetail, patchGoal, deleteGoal } = createGoalsApi(serverFetcher);
