import { noteMutationOptions } from ".";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** 노트를 생성하고 목록 및 생성된 상세 캐시를 갱신한다. */
export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(noteMutationOptions.create(queryClient));
};

/** 노트를 수정하고 목록 및 해당 상세 캐시를 갱신한다. */
export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(noteMutationOptions.update(queryClient));
};

/** 노트를 삭제하고 해당 상세 캐시를 제거한 뒤 목록을 갱신한다. */
export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(noteMutationOptions.remove(queryClient));
};
