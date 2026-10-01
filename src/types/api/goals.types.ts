export type GoalListResponse = {
  goals: GoalItem[];
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
  todos: GoalTodoItem[];
};

type GoalItem = {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  todoCount: number;
  completedCount: number;
  createdAt: string;
  updatedAt: string;
};

type GoalTodoItem = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};
