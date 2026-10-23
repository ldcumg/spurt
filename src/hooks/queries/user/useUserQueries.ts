import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "./queryOptions";

export function useUserQuery() {
  return useQuery(userQueryOptions.me());
}
