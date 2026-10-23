"use client";

import { todoQueryOptions } from "@/hooks/queries/todo/queryOptions";
import type { TodoGoalSummary, TodoResponse } from "@/types/todos.types";
import { useQueries } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export type NoteTodoGoalState =
  | { status: "pending"; goal: null }
  | { status: "error"; goal: null }
  | { status: "success"; goal: TodoGoalSummary | null };

const unwrapTodoResponse = (response: AxiosResponse<TodoResponse> | TodoResponse | undefined) => {
  if (!response) return undefined;

  return "data" in response ? response.data : response;
};

export const getNoteTodoGoalLabel = (state: NoteTodoGoalState | undefined) => {
  if (!state || state.status === "pending") return "목표를 불러오는 중이에요.";
  if (state.status === "error") return "목표 정보를 불러오지 못했어요.";

  return state.goal?.title ?? "연결된 목표 없음";
};

export const useNoteTodoGoals = (todoIds: number[]) => {
  const uniqueTodoIds = [...new Set(todoIds.filter((todoId) => Number.isInteger(todoId) && todoId > 0))];
  const queries = useQueries({
    queries: uniqueTodoIds.map((todoId) => todoQueryOptions.detail(todoId)),
  });
  const goalStateByTodoId = new Map<number, NoteTodoGoalState>();

  uniqueTodoIds.forEach((todoId, index) => {
    const query = queries[index];

    if (!query || query.isPending) {
      goalStateByTodoId.set(todoId, { status: "pending", goal: null });
      return;
    }

    if (query.isError) {
      goalStateByTodoId.set(todoId, { status: "error", goal: null });
      return;
    }

    const todo = unwrapTodoResponse(query.data as AxiosResponse<TodoResponse> | TodoResponse | undefined);
    goalStateByTodoId.set(todoId, todo ? { status: "success", goal: todo.goal } : { status: "error", goal: null });
  });

  return goalStateByTodoId;
};
