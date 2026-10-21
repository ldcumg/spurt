import { USERS_API_PATH } from "@/constants/apiEndpoints";
import USER_QUERY_KEYS from "@/constants/queryKeys/user";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { UserResponse } from "@/types/users.types";
import { queryOptions } from "@tanstack/react-query";

export const userQueryOptions = {
  me: () =>
    queryOptions({
      queryKey: USER_QUERY_KEYS.me,
      queryFn: async () => {
        const { data } = await clientFetcher.get<UserResponse>(USERS_API_PATH.me);
        return data;
      },
      staleTime: Infinity,
    }),
};
