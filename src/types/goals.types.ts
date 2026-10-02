import { TodoResponse } from "./todos.types";

// api request

export type PostGoalRequest = {
  title: string;
};

export type PatchGoalRequest = {
  title: string;
};

export type GetGoalListParams = {
  cursor?: number;
  limit?: number;
};

// api response

// 2. 목록 조회 (GET /{teamId}/goals) 응답
export type GoalListResponse = {
  goals: GoalListItem[];
  nextCursor: number | null;
  totalCount: number;
};

export type GoalResponse = {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type GoalDetailResponse = {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  todos: GoalTodoSummary[];
};

// 1. 목록 조회 (GET /{teamId}/goals) 응답 아이템 (API 명세 준수: todos 없음)
export type GoalListItem = {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  todoCount: number;
  completedCount: number;
  createdAt: string;
  updatedAt: string;
};

export type GoalTodoSummary = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

// client type

// 3. 컴포넌트 편의상 둘을 합친 형태가 필요할 때 쓰는 확장 타입
export type GoalWithTodos = GoalListItem & {
  todos: TodoResponse[];
};
