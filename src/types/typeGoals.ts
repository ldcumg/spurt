// 목표(Goals) 목록 조회
export type GoalListResponse = {
  goals: GoalItem[];
  nextCursor: number | null;
  totalCount: number;
};

// 개별 목표 타입
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
