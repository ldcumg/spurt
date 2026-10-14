import type { NoteDraft } from "./noteDraftStorage";

type GoalOption = {
  id: string;
};

type TodoOption = {
  id: number;
  goalId: number | null;
};

export type DraftSelectionStatus = "complete" | "goalRequired" | "goalUnavailable" | "todoRequired" | "todoUnavailable";

export type RestoredDraftSelection = {
  goalId: string;
  todoId: string;
  status: DraftSelectionStatus;
};

export const resolveDraftSelection = (
  draft: Pick<NoteDraft, "goalId" | "todoId">,
  goals: GoalOption[],
  todos: TodoOption[],
): RestoredDraftSelection => {
  const fallbackGoalId = goals[0]?.id ?? "";
  const savedGoalId = draft.goalId ? String(draft.goalId) : "";
  const savedTodoId = draft.todoId ? String(draft.todoId) : "";

  if (!savedGoalId) {
    return { goalId: fallbackGoalId, todoId: "", status: "goalRequired" };
  }

  if (!goals.some((goal) => goal.id === savedGoalId)) {
    return { goalId: fallbackGoalId, todoId: "", status: "goalUnavailable" };
  }

  if (!savedTodoId) {
    return { goalId: savedGoalId, todoId: "", status: "todoRequired" };
  }

  const savedTodo = todos.find((todo) => String(todo.id) === savedTodoId);
  if (!savedTodo || String(savedTodo.goalId) !== savedGoalId) {
    return { goalId: savedGoalId, todoId: "", status: "todoUnavailable" };
  }

  return { goalId: savedGoalId, todoId: savedTodoId, status: "complete" };
};
