import type { GoalResponse } from "@/types/goals.types";

export type HandleAddTodoPrams = {
  selectedGoal: GoalResponse | null;
  selectedDate: Date | null;
  isDisabled: boolean;
};

/** todo 추가 서비스 로직 */
export const handleAddTodo = (
  e: React.SubmitEvent<HTMLFormElement>,
  { selectedGoal, selectedDate, isDisabled }: HandleAddTodoPrams,
) => {
  e.preventDefault();

  if (!selectedGoal || !selectedDate || isDisabled) return;

  //TODO - 파일 url 발금 로직

  const formData = new FormData(e.currentTarget);

  const newTodo = {
    title: formData.get("title"),
    goalId: selectedGoal.id,
    dueDate: "",
    fileUrl: "",
    linkUrl: formData.get("linkUrl"),
  };

  //TODO - 할 일 추가 api
  console.log(newTodo);
};
