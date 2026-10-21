import { AUTH_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { PostLoginRequest, PostSignupRequest } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (body: PostLoginRequest) => clientFetcher.post(AUTH_API_PATH.login, body),
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (body: PostSignupRequest) => clientFetcher.post(AUTH_API_PATH.signup, body),
  });
};
