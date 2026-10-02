export const Goal = {
  goals: [
    {
      id: 3,
      teamId: "team-abc",
      userId: 1,
      title: "프로젝트 완성",
      todoCount: 5,
      completedCount: 2,
      createdAt: "2026-02-15T09:00:00.000Z",
      updatedAt: "2026-02-15T09:00:00.000Z",
    },
  ],
  nextCursor: 2,
  totalCount: 8,
};

export const Todos = {
  todos: [
    {
      id: 12,
      teamId: "team-abc",
      userId: 1,
      goalId: 3,
      title: "API 문서 작성",
      done: false,
      fileUrl: null,
      linkUrl: "https://docs.example.com",
      dueDate: "2026-02-20T00:00:00.000Z",
      createdAt: "2026-02-16T09:00:00.000Z",
      updatedAt: "2026-02-16T09:00:00.000Z",
      goal: {
        id: 3,
        title: "프로젝트 완성",
      },
      noteIds: [5],
      tags: [
        {
          id: 1,
          name: "urgent",
        },
      ],
      isFavorite: false,
    },
  ],
  nextCursor: 11,
  totalCount: 25,
};
