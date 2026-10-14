import type { GoalListResponse } from "@/types/goals.types";

//NOTE - 임시 데이터
export const goalMocks: GoalListResponse = {
  goals: [
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
    // 1. 진행 중인 목표 (일부 달성)
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
    // 2. 100% 달성 완료된 목표
    {
      id: 4,
      teamId: "team-abc",
      userId: 1,
      title: "정보처리기사 실기 자격증 취득",
      todoCount: 6,
      completedCount: 6,
      createdAt: "2026-02-10T10:00:00.000Z",
      updatedAt: "2026-02-18T18:30:00.000Z",
    },
    // 3. 아직 시작 안 한 목표 (0% 달성)
    {
      id: 5,
      teamId: "team-abc",
      userId: 1,
      title: "디자인 시스템 라이브러리 배포",
      todoCount: 4,
      completedCount: 0,
      createdAt: "2026-02-16T14:20:00.000Z",
      updatedAt: "2026-02-16T14:20:00.000Z",
    },
    // 4. 할 일이 없는 신규 목표 (Empty state 테스트용)
    {
      id: 6,
      teamId: "team-abc",
      userId: 1,
      title: "상반기 개인 포트폴리오 사이트 리뉴얼",
      todoCount: 0,
      completedCount: 0,
      createdAt: "2026-02-18T09:00:00.000Z",
      updatedAt: "2026-02-18T09:00:00.000Z",
    },
    // 5. 달성률이 높은 목표
    {
      id: 7,
      teamId: "team-abc",
      userId: 2,
      title: "백엔드 API 최적화 및 문서 자동화",
      todoCount: 8,
      completedCount: 6,
      createdAt: "2026-02-12T11:00:00.000Z",
      updatedAt: "2026-02-17T16:45:00.000Z",
    },
    // 6. 긴 타이틀 (말줄임 truncate 테스트용)
    {
      id: 8,
      teamId: "team-abc",
      userId: 1,
      title: "Next.js App Router 기반 대규모 애플리케이션 성능 프로파일링 및 번들 사이즈 최적화",
      todoCount: 12,
      completedCount: 5,
      createdAt: "2026-02-14T08:30:00.000Z",
      updatedAt: "2026-02-18T13:00:00.000Z",
    },
  ],
  nextCursor: null,
  totalCount: 6,
};
