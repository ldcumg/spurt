import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { PostGoalRequest } from "@/types/goals.types";

export const postGoal = (body: PostGoalRequest) => clientFetcher.post(GOALS_API_PATH.base, body);
