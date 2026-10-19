import { goalQueryOptions } from ".";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// [all] 목표 전체 요청
export const useAllGoalQuery = () => {
  const queryClient = useQueryClient();
  return useQuery(goalQueryOptions.all(queryClient));
};

export const useDetailGoalQuery = (goalId: string | number) => {
  return useQuery(goalQueryOptions.detail(goalId));
};
