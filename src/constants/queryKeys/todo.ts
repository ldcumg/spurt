const TODO_QUERY_KEYS = {
  all: ["todos"],
  detail: (todoId: string | number) => [...TODO_QUERY_KEYS.all, todoId],
} as const;

export default TODO_QUERY_KEYS;
