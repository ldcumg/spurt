import { clientFetcher } from "@/lib/axios/clientFetcher";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await clientFetcher.get("/user");
      return data;
    },
    staleTime: Infinity, //브라우저 세션 동안 캐시 유지
  });
}
