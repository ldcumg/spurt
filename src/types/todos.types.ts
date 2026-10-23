import type { PaginationParams } from "./api/request.types";
import type { PaginationMeta, Timestamps } from "./api/response.types";

// api request

type TodoRequired = {
  title: string;
  goalId: number;
};

type TodoOptional = Partial<{
  done: boolean;
  fileUrl: string;
  linkUrl: string;
  dueDate: string;
  tags: string[];
}>;

export type GetTodoListParams = {
  goalId?: number;
  sort?: "latest" | "dueSoon";
  done?: boolean;
  keyword?: string;
  date?: string;
  from?: string;
  to?: string;
} & PaginationParams;

export type PostTodoRequest = TodoRequired & TodoOptional;

export type PatchTodoRequest = Partial<TodoRequired> & TodoOptional;

export type GetFavoriteTodoListParams = PaginationParams;

// api response

// 할 일이 포함된 목표 타입을 요약
export type TodoGoalSummary = {
  id: number;
  title: string;
};

export type TodoTag = {
  id: number;
  name: string;
};

export type TodoResponse = {
  id: number;
  teamId: string;
  userId: number;
  goalId: number;
  title: string;
  done: boolean;
  fileUrl: string | null;
  linkUrl: string | null;
  dueDate: string | null;
  goal: TodoGoalSummary;
  noteIds: number[];
  tags: TodoTag[];
  isFavorite: boolean;
} & Timestamps;

export type TodoListResponse = {
  todos: TodoResponse[];
} & PaginationMeta;

export type FavoriteTodoResponse = {
  id: number;
  teamId: string;
  userId: number;
  todoId: number;
  todo: TodoResponse;
} & Timestamps;

export type FavoriteTodoListResponse = {
  favorites: FavoriteTodoResponse[];
} & PaginationMeta;
