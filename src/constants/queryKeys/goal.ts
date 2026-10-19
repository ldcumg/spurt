const GOAL_QUERY_KEYS = {
  all: ["goals"] as const,
  lists: () => [...GOAL_QUERY_KEYS.all, "list"] as const,
  list: (params?: { cursor?: number | null; limit?: number }) => [...GOAL_QUERY_KEYS.lists(), params] as const,
  details: () => [...GOAL_QUERY_KEYS.all, "detail"] as const,
  detail: (goalId: number | string) => [...GOAL_QUERY_KEYS.all, goalId] as const,
};

export default GOAL_QUERY_KEYS;
