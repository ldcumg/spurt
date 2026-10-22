// server component
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import GoalDetailView from "./_components/GoalDetailView";
import GOAL_QUERY_KEYS from "@/constants/queryKeys/goal";
import { getGoalList } from "@/apis/goals/server";

export default async function GoalPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: GOAL_QUERY_KEYS.list({ limit: 10 }),
    queryFn: async () => {
      const { data } = await getGoalList({ limit: 10 });
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoalDetailView />
    </HydrationBoundary>
  );
}
