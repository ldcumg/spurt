import { AUTH_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { PostLoginRequest, PostSignupRequest } from "@/types/auth.types";
import { mutationOptions } from "@tanstack/react-query";

export const authMutationOptions = {
  login: () =>
    mutationOptions({
      mutationFn: (body: PostLoginRequest) => clientFetcher.post(AUTH_API_PATH.login, body),
    }),
  signup: () =>
    mutationOptions({
      mutationFn: (body: PostSignupRequest) => clientFetcher.post(AUTH_API_PATH.signup, body),
    }),
  logout: () =>
    mutationOptions({
      mutationFn: () => clientFetcher.post(AUTH_API_PATH.logout),
    }),
};
