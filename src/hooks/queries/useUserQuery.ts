import { clientFetcher } from "@/lib/axios/clientFetcher";
import { useQuery } from "@tanstack/react-query";

{
  /**
    사용예시:
    export default function GoalPage() {
    const { data: user } = useUser(); // 네트워크 호출 없이 캐시에서 즉시 반환

    return (
        <header>
        <p className="text-display">{user?.name}님의 목표</p>
        </header>
    );
    }
 */
}
export function useUserQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await clientFetcher.get("/user");
      return data;
    },
    staleTime: Infinity, //브라우저 세션 동안 캐시 유지
  });
}
