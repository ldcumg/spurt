import { authMutationOptions } from "./mutationOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(authMutationOptions.login(queryClient));
};

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(authMutationOptions.signup(queryClient));
};

export const useLogoutMutation = () => {
  return useMutation(authMutationOptions.logout());
};
