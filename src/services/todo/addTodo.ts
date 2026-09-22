import type { GoalItem } from "@/types/typeGoals";

export type HandleAddTodoPrams = {
  selectedGoal: GoalItem | null;
  setGoalError: (errorMassage: string) => void;
  isDisabled: boolean;
};

/** todo 추가 서비스 로직 */
export const handleAddTodo = (
  e: React.SubmitEvent<HTMLFormElement>,
  { selectedGoal, setGoalError, isDisabled }: HandleAddTodoPrams,
) => {
  e.preventDefault();

  if (!selectedGoal) {
    setGoalError("목표를 선택해 주세요");
    return;
  }

  if (isDisabled) return;

  //TODO - 파일 url 발금 로직

  const formData = new FormData(e.currentTarget);

  const newTodo = {
    title: formData.get("title"),
    goalId: selectedGoal.id,
    fileUrl: "",
    linkUrl: formData.get("linkUrl"),
  };

  //TODO - 할 일 추가 api
  console.log(newTodo);
};
