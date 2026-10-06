import { goalQueryOptions } from ".";
import { useQuery } from "@tanstack/react-query";

/** NOTE - 임시 전체 goal 요청 쿼리 */
export const useAllGoalQuery = () => {
  return useQuery(goalQueryOptions.all());
};
