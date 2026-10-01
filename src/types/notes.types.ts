import { TodoGoalSummary, TodoTag } from "./todos.types";

// api request

export type PostNoteRequest = {
  todoId: number;
  title: string;
  content?: Record<string, unknown>;
  linkUrl?: string;
};

export type PatchNoteRequest = {
  title?: string;
  content?: Record<string, unknown> | null;
  linkUrl?: string | null;
};

export type GetNoteListParams = {
  cursor?: number;
  limit?: number;
  todoId?: number;
  goalId?: number;
  search?: string;
  sort?: "latest" | "oldest";
};

// api response

export type NoteListResponse = {
  notes: NoteResponse[];
  nextCursor: number | null;
  totalCount: number;
};

export type NoteResponse = {
  id: number;
  teamId: string;
  userId: number;
  todoId: number;
  title: string;
  content?: Record<string, unknown> | null;
  linkUrl: string | null;
  createdAt: string;
  updatedAt: string;
  todo: NoteTodoSummary;
};

export type NoteTodoSummary = {
  id: number;
  title: string;
  done: boolean;
  createdAt?: string;
  goal?: TodoGoalSummary | null;
  tags?: TodoTag[];
};
