import { AUTH_API_PATH } from "@/constants/apiEndpoints";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { PostLoginRequest, PostSignupRequest } from "@/types/auth.types";
import { mutationOptions, type QueryClient } from "@tanstack/react-query";

export const authMutationOptions = {
  login: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (body: PostLoginRequest) => clientFetcher.post(AUTH_API_PATH.login, body),
      onSuccess: () => queryClient.removeQueries(),
    }),
  signup: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (body: PostSignupRequest) => clientFetcher.post(AUTH_API_PATH.signup, body),
      onSuccess: () => queryClient.removeQueries(),
    }),
  logout: () =>
    mutationOptions({
      mutationFn: () => clientFetcher.post(AUTH_API_PATH.logout),
    }),
};
