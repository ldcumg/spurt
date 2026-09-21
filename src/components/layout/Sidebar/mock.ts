import type { GoalItem } from "@/types/typeGoals";
import type { UserItem } from "@/types/typeUsers";

export const MOCK_GOALS: GoalItem[] = [
  {
    id: 1,
    teamId: "team-abc",
    userId: 1,
    title: "자바스크립트로 웹 서비스 만들기",
    todoCount: 5,
    completedCount: 2,
    createdAt: "2026-02-15T09:00:00.000Z",
    updatedAt: "2026-02-15T09:00:00.000Z",
  },
  {
    id: 2,
    teamId: "team-abc",
    userId: 1,
    title: "타입스크립트 마스터하기",
    todoCount: 3,
    completedCount: 0,
    createdAt: "2026-02-15T10:00:00.000Z",
    updatedAt: "2026-02-15T10:00:00.000Z",
  },
  {
    id: 3,
    teamId: "team-abc",
    userId: 1,
    title: "자바스크립트로 웹 서비스 만들기와 같은 엄청 긴 제목",
    todoCount: 8,
    completedCount: 8,
    createdAt: "2026-02-15T11:00:00.000Z",
    updatedAt: "2026-02-16T11:00:00.000Z",
  },
  {
    id: 4,
    teamId: "team-abc",
    userId: 1,
    title: "정보처리기사 실기 준비하기",
    todoCount: 2,
    completedCount: 1,
    createdAt: "2026-02-15T12:00:00.000Z",
    updatedAt: "2026-02-15T12:00:00.000Z",
  },
];

export const MOCK_USER: UserItem = {
  id: 1,
  teamId: "team-abc",
  email: "cheddacheese@spurt.com",
  name: "체다치즈",
  image: null,
  createdAt: "2026-02-15T09:00:00.000Z",
  updatedAt: "2026-02-15T09:00:00.000Z",
};
