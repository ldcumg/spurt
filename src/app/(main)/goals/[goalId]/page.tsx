// server component
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import GoalDetailView from "../_components/GoalDetailView";
import GOAL_QUERY_KEYS from "@/constants/queryKeys/goal";
import { getGoalDetail, getGoalList } from "@/apis/goals/server";
import { getTodoList } from "@/apis/todos/server";
import TODO_QUERY_KEYS from "@/constants/queryKeys/todo";

export default async function GoalPage({ params }: { params: Promise<{ goalId: string }> }) {
  const { goalId } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: GOAL_QUERY_KEYS.list({ limit: 10 }),
      queryFn: async () => {
        const { data } = await getGoalList({ limit: 10 });
        return data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: GOAL_QUERY_KEYS.detail(goalId),
      queryFn: async () => {
        const { data } = await getGoalDetail(Number(goalId));
        return data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: TODO_QUERY_KEYS.list({ goalId: Number(goalId) }),
      queryFn: async () => {
        const { data } = await getTodoList({ goalId: Number(goalId) });
        return data;
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoalDetailView />
    </HydrationBoundary>
  );
}
