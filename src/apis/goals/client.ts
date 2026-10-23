import { createGoalsApi } from "@/apis/goals/api";
import { clientFetcher } from "@/lib/axios/clientFetcher";

export const { getGoalList, postGoal, getGoalDetail, patchGoal, deleteGoal } = createGoalsApi(clientFetcher);
