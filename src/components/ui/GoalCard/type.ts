// 할 일(Todo) 요약 타입 (목표 상세 조회 응답용)
export type GoalTodoSummary = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

// 1. 목록 조회(GET /{teamId}/goals)의 개별 목표 아이템
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

// 목록 조회 API 전체 응답 (커서 페이지네이션)
export type GoalListResponse = {
  goals: GoalListItem[];
  nextCursor: number | null;
  totalCount: number;
};

// 2. 상세 조회(GET /{teamId}/goals/{goalId}) API 응답
export type GoalDetailResponse = {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  todos: GoalTodoSummary[];
};
