import { goalQueryOptions } from ".";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// 목표 목록 조회 (상세 캐시 포함)
export const useGoalListQuery = (params?: { cursor?: number | null; limit?: number }) => {
  const queryClient = useQueryClient();
  return useQuery(goalQueryOptions.list(queryClient, params));
};

// 목표 상세 조회
export const useGoalDetailQuery = (goalId: string | number) => {
  return useQuery(goalQueryOptions.detail(goalId));
};
