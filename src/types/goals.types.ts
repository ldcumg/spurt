import { TodoItem } from "./todos.types";

// 1. 목록 조회 (GET /{teamId}/goals) 응답 아이템 (API 명세 준수: todos 없음)
export type GoalItem = {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  todoCount: number;
  completedCount: number;
  createdAt: string;
  updatedAt: string;
};

// 2. 상세 조회 (GET /{teamId}/goals/{goalId}) 응답 (todos 포함)
export type GoalListResponse = {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  todos: TodoItem[];
};

// 3. 컴포넌트 편의상 둘을 합친 형태가 필요할 때 쓰는 확장 타입
export type GoalWithTodos = GoalItem & {
  todos: TodoItem[];
};
