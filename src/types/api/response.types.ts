export type Timestamps = {
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  nextCursor: number | null;
  totalCount: number;
};
