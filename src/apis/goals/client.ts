import { createGoalsApi } from "@/apis/goals/api";
import { clientFetcher } from "@/lib/axios/clientFetcher";

export const { postGoal } = createGoalsApi(clientFetcher);
