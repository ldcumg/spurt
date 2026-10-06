// api request

export type PostTodoRequest = {
  title: string;
  goalId?: number;
  fileUrl?: string;
  linkUrl?: string;
  dueDate?: string;
  tags?: string[];
};

export type PatchTodoRequest = {
  title?: string;
  done?: boolean;
  goalId?: number | null;
  fileUrl?: string | null;
  linkUrl?: string | null;
  dueDate?: string | null;
  tags?: string[];
};

export type GetTodoListParams = {
  cursor?: number;
  limit?: number;
  goalId?: number;
  sort?: "latest" | "dueSoon";
  done?: boolean;
  keyword?: string;
  date?: string;
  from?: string;
  to?: string;
};

export type GetFavoriteTodoListParams = {
  cursor?: number;
  limit?: number;
};

// api response

export type TodoListResponse = {
  todos: TodoResponse[];
  nextCursor: number | null;
  totalCount: number;
};

export type FavoriteTodoListResponse = {
  favorites: FavoriteTodoResponse[];
  nextCursor: number | null;
  totalCount: number;
};

export type TodoResponse = {
  id: number;
  teamId: string;
  userId: number;
  goalId: number | null;
  title: string;
  done: boolean;
  fileUrl: string | null;
  linkUrl: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  goal: TodoGoalSummary | null;
  noteIds: number[];
  tags: TodoTag[];
  isFavorite: boolean;
};

export type FavoriteTodoResponse = {
  id: number;
  teamId: string;
  userId: number;
  todoId: number;
  createdAt: string;
  todo: TodoResponse;
};

// 할 일이 포함된 목표 타입을 요약
export type TodoGoalSummary = {
  id: number;
  title: string;
};

export type TodoTag = {
  id: number;
  name: string;
};
