import { goalQueryOptions } from "./queryOptions";
import { useQuery } from "@tanstack/react-query";

// 목표 목록 조회
export const useGoalListQuery = (params?: { cursor?: number | null; limit?: number }) => {
  return useQuery(goalQueryOptions.list(params));
};

// 목표 상세 조회
export const useGoalDetailQuery = (goalId: string | number) => {
  return useQuery(goalQueryOptions.detail(goalId));
};
