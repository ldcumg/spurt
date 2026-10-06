// NOTE - 임시
const GOAL_QUERY_KEYS = {
  all: ["goals"],
  detail: (goalId: string | number) => [...GOAL_QUERY_KEYS.all, goalId],
} as const;

export default GOAL_QUERY_KEYS;
