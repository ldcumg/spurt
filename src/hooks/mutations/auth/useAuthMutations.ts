import { authMutationOptions } from "./mutationOptions";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation(authMutationOptions.login());
};

export const useSignupMutation = () => {
  return useMutation(authMutationOptions.signup());
};

export const useLogoutMutation = () => {
  return useMutation(authMutationOptions.logout());
};
