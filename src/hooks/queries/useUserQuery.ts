import { USERS_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import type { UserResponse } from "@/types/users.types";
import { useQuery } from "@tanstack/react-query";

export const USER_QUERY_KEY = ["user", "me"] as const;

export function useUserQuery() {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const { data } = await clientFetcher.get<UserResponse>(USERS_API_PATH.me);

      return data;
    },
    staleTime: Infinity,
  });
}
