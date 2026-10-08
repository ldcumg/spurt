export type HandleAddGoalParams = {
  isDisabled: boolean;
};

/** goal 추가 서비스 로직 */
export const handleAddGoal = (e: React.SubmitEvent<HTMLFormElement>, { isDisabled }: HandleAddGoalParams) => {
  e.preventDefault();

  if (isDisabled) return;

  const formData = new FormData(e.currentTarget);

  const newGoal = {
    title: formData.get("title"),
  };

  console.log(newGoal);
};
