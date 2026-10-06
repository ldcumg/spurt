import { AUTH_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { PostLoginRequest } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (body: PostLoginRequest) => clientFetcher.post(AUTH_API_PATH.login, body),
  });
};
