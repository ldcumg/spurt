import $_QUERY_KEYS from "../queryKeys/$QueryKeys";
import { $Api } from "@/apis/$Apis";
import type { $Params } from "@/types";
import { useQuery } from "@tanstack/react-query";

/** $ 요청 쿼리 */
export const use$Query = ({ $ }: $Params) => {
  return useQuery({
    queryKey: $_QUERY_KEYS[$]($),
    queryFn: () => $Api({ $, $ }),
  });
};
