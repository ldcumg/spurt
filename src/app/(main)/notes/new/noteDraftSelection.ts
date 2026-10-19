import type { NoteDraft } from "./noteDraftStorage";

interface GoalSelectionOption {
  id: string;
}

interface TodoSelectionOption {
  id: number;
  goalId: number | null;
}

export type DraftSelectionStatus = "complete" | "goalRequired" | "goalUnavailable" | "todoRequired" | "todoUnavailable";

interface ResolvedDraftSelection {
  goalId: string;
  todoId: string;
  status: DraftSelectionStatus;
}

/** 임시저장된 목표와 할 일이 현재 선택 목록에서도 유효한지 확인한다. */
export const resolveDraftSelection = (
  draft: Pick<NoteDraft, "goalId" | "todoId">,
  goals: GoalSelectionOption[],
  todos: TodoSelectionOption[],
): ResolvedDraftSelection => {
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
