export type TodoListResponse = {
  todos: TodoItem[];
  nextCursor: number | null;
  totalCount: number;
};

// 할 일이 포함된 목표 타입을 요약
export type TodoGoalSummary = {
  id: number;
  title: string;
};

export type TodoItem = {
  id: number;
  teamId: string;
  userId: number;
  goalId: number;
  title: string;
  done: boolean;
  fileUrl: string | null;
  linkUrl: string | null;
  createdAt: string;
  updatedAt: string;
  goal: TodoGoalSummary;
  noteIds: number[];
  // tag랑 favorite 더 있음. 사용할 거면 추가
};
