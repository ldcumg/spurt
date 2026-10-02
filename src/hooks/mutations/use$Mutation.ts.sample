import $_QUERY_KEYS from "../queryKeys/$QueryKeys";
import { $Api } from "@/apis/$Apis";
import type { $Params } from "@/types/api/$Params";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** $ 뮤테이트 */
export const use$Mutation = ({ $ }: $Params) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => $Api({ $ }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: $_QUERY_KEYS[$]($),
      });
    },
  });
};
