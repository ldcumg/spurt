const TODO_QUERY_KEYS = {
  all: ["todos"] as const,
  lists: () => [...TODO_QUERY_KEYS.all, "list"] as const,
  list: (params?: {
    cursor?: number | null;
    limit?: number;
    goalId?: number;
    sort?: string;
    done?: string;
    keyword?: string;
    date?: string;
    from?: string;
    to?: string;
  }) => [...TODO_QUERY_KEYS.lists(), params] as const,
  details: () => [...TODO_QUERY_KEYS.all, "detail"] as const,
  detail: (todoId: string | number) => [...TODO_QUERY_KEYS.all, todoId],
} as const;

export default TODO_QUERY_KEYS;
