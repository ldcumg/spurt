import type { GoalListResponse } from "@/types/goals.types";

//NOTE - 임시 데이터
export const goalMocks: GoalListResponse = {
  goals: [
    {
      id: 1,
      title: "자바스크립트로 웹 서비스 만들기",
      teamId: "string",
      userId: 1,
      createdAt: "",
      updatedAt: "",
      todoCount: 0,
      completedCount: 0,
    },
    {
      id: 2,
      title: "디자인 시스템 강의 듣기",
      teamId: "string",
      userId: 1,
      createdAt: "",
      updatedAt: "",
      todoCount: 0,
      completedCount: 0,
    },
    {
      id: 3,
      title: "프론트엔드 포트폴리오 완성하기",
      teamId: "string",
      userId: 1,
      createdAt: "",
      updatedAt: "",
      todoCount: 0,
      completedCount: 0,
    },
  ],
  nextCursor: 11,
  totalCount: 25,
};
