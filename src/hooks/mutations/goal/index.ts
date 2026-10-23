import { deleteGoal, patchGoal, postGoal } from "@/apis/goals/client";
//import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import GOAL_QUERY_KEYS from "@/constants/queryKeys/goal";
//import { clientFetcher } from "@/lib/axios/clientFetcher";
import { GoalDetailResponse, GoalListResponse, GoalResponse, PostGoalRequest } from "@/types/goals.types";
import { MutationOptions, type QueryClient } from "@tanstack/react-query";

export const goalMutationOptions = {
  create: (queryClient: QueryClient): MutationOptions<GoalResponse, Error, PostGoalRequest> => ({
    mutationFn: async (newGoal: PostGoalRequest) => {
      const response = await postGoal(newGoal);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOAL_QUERY_KEYS.lists() });
    },
  }),

  update: (queryClient: QueryClient): MutationOptions<GoalResponse, Error, { goalId: number; title: string }> => ({
    mutationFn: async ({ goalId, title }) => {
      const response = await patchGoal(goalId, { title });
      return response.data;
    },
    onSuccess: async (data, { goalId }) => {
      await queryClient.cancelQueries({ queryKey: GOAL_QUERY_KEYS.detail(goalId) });
      queryClient.setQueryData<GoalDetailResponse>(GOAL_QUERY_KEYS.detail(goalId), (previous) => ({
        ...data,
        todos: previous?.todos ?? [],
      }));
      queryClient.setQueriesData<GoalListResponse>({ queryKey: GOAL_QUERY_KEYS.lists() }, (previous) =>
        previous
          ? {
              ...previous,
              goals: previous.goals.map((goal) =>
                goal.id === goalId ? { ...goal, title: data.title, updatedAt: data.updatedAt } : goal,
              ),
            }
          : previous,
      );
      queryClient.invalidateQueries({ queryKey: GOAL_QUERY_KEYS.lists() });
    },
  }),
  delete: (queryClient: QueryClient): MutationOptions<void, Error, number | string> => ({
    mutationFn: async (goalId: number | string) => {
      await deleteGoal(Number(goalId));
    },
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: GOAL_QUERY_KEYS.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: GOAL_QUERY_KEYS.lists() });
    },
  }),
};
