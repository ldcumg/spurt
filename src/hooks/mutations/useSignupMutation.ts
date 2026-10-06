import { AUTH_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { PostSignupRequest } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (body: PostSignupRequest) => clientFetcher.post(AUTH_API_PATH.signup, body),
  });
};
