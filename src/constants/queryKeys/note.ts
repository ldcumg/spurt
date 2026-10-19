const NOTE_QUERY_KEYS = {
  all: ["notes"] as const,
  lists: () => [...NOTE_QUERY_KEYS.all, "list"] as const,
  list: (params?: { cursor: number | null; limit?: number; todoId?: number; goalId?: number; search?: string }) =>
    [...NOTE_QUERY_KEYS.lists(), params] as const,
  details: () => [...NOTE_QUERY_KEYS.all, "detail"] as const,
  detail: (noteId: number | string) => [...NOTE_QUERY_KEYS.all, noteId] as const,
};

export default NOTE_QUERY_KEYS;
