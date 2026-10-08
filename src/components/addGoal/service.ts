// export type HandleAddGoalParams = {
//   isDisabled: boolean;
// };

import { PostGoalRequest } from "@/types/goals.types";
import { UseMutateFunction } from "@tanstack/react-query";

// /** goal 추가 서비스 로직 */
// export const handleAddGoal = (e: React.SubmitEvent<HTMLFormElement>, { isDisabled }: HandleAddGoalParams) => {
//   e.preventDefault();

//   if (isDisabled) return;

//   const formData = new FormData(e.currentTarget);

//   const newGoal = {
//     title: formData.get("title"),
//   };

//   console.log(newGoal);
// };

export type HandleAddGoalParams<TData, TError> = {
  event: React.SubmitEvent<HTMLFormElement>;
  addGoalMutate: UseMutateFunction<TData, TError, PostGoalRequest>;
  hasError: boolean;
  addGoalClose: () => void;
};

export const handleAddGoal = async <TData, TError>({
  event,
  addGoalMutate,
  hasError,
  addGoalClose,
}: HandleAddGoalParams<TData, TError>) => {
  event.preventDefault();
  console.log("[log] hasError =>", hasError);

  const formData = new FormData(event.currentTarget);
  const newGoal: PostGoalRequest = {
    title: formData.get("title") as string,
  };

  addGoalMutate(newGoal, {
    onSuccess: (data) => {
      console.log(data);
      alert("목표가 추가되었습니다.");
      addGoalClose();
    },
    onError: (error) => {
      console.error(error);
      alert("오류가 발생했습니다.");
    },
  });
};
