import type { GoalListItem } from "@/types/goals.types";

export type FormState = {
  selectedGoal: GoalListItem | null;
  selectedDate: Date | null;
  file: File | null;
};

export type AddTodoErrorMassage = {
  title: string;
  goal: string;
  dueDate: string;
  file: string;
  linkUrl: string;
};
