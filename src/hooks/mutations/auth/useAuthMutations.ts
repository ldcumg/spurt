import { useMutation } from "@tanstack/react-query";
import { authMutationOptions } from "./mutationOptions";

export const useLoginMutation = () => {
  return useMutation(authMutationOptions.login());
};

export const useSignupMutation = () => {
  return useMutation(authMutationOptions.signup());
};
