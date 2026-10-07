import type { GoalListItem } from "@/types/goals.types";

export type FormState = {
  file: File | null;
  selectedGoal: GoalListItem | null;
  selectedDate: Date | null;
};

export type AddTodoErrorMassage = {
  title: string;
  goal: string;
  dueDate: string;
  file: string;
  linkUrl: string;
};
