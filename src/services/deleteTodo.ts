import type { UseMutateFunction } from "@tanstack/react-query";

/** 할 일 삭제 */
export const deleteTodo = <TData, TError>(deleteTodoMutate: UseMutateFunction<TData, TError>) => {
  if (!confirm("삭제하시겠습니까?")) {
    return;
  }

  deleteTodoMutate(undefined, {
    onSuccess: () => {
      alert("할 일이 삭제되었습니다.");
    },
    onError: (error) => {
      alert("오류가 발생했습니다.");
      console.error(error);
    },
  });
};
