import { goalMocks } from "./mocks";
import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import { http, HttpResponse } from "msw";

const goalsState = [...goalMocks.goals];

export const goalHandlers = (buildApiUrl: (path: string) => string) => [
  // 목표 목록 조회
  http.get(buildApiUrl(GOALS_API_PATH.base), () => {
    return HttpResponse.json({
      goals: goalsState,
      nextCursor: goalMocks.nextCursor,
      totalCount: goalsState.length,
    });
  }),

  // 새 목표 생성 (POST /api/goals)
  http.post(buildApiUrl(GOALS_API_PATH.base), async ({ request }) => {
    const body = (await request.json()) as { title?: string };

    // 유효성 검사: 제목 누락 방어
    if (!body?.title || !body.title.trim()) {
      return HttpResponse.json({ message: "목표 제목은 필수입니다.", code: "INVALID_TITLE" }, { status: 400 });
    }

    const now = new Date().toISOString();
    // 기존 목표들 중 가장 큰 ID에 +1 (없을 경우 Date.now())
    const nextId = goalsState.length > 0 ? Math.max(...goalsState.map((g) => g.id)) + 1 : Date.now();

    const newGoal = {
      id: nextId,
      teamId: "team-abc",
      userId: 1,
      title: body.title.trim(),
      todoCount: 0,
      completedCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    // 목 데이터 목록 최상단에 새 목표 추가하여 이후 GET 목록 조회에 반영
    goalsState.unshift(newGoal);

    return HttpResponse.json(newGoal, { status: 201 });
  }),

  // 목표 수정 (PATCH /api/goals/:goalId)
  http.patch(buildApiUrl(`${GOALS_API_PATH.base}/:goalId`), async ({ params, request }) => {
    const { goalId } = params;
    const body = (await request.json()) as { title?: string };

    if (!body.title || !body.title.trim()) {
      return HttpResponse.json({ message: "목표 제목은 필수입니다.", code: "INVALID_TITLE" }, { status: 400 });
    }

    const targetGoal = goalsState.find((goal) => String(goal.id) === String(goalId));
    if (!targetGoal) {
      return HttpResponse.json({ message: "존재하지 않는 목표입니다.", code: "GOAL_NOT_FOUND" }, { status: 404 });
    }

    targetGoal.title = body.title;
    targetGoal.updatedAt = new Date().toISOString();

    return HttpResponse.json({
      id: targetGoal.id,
      teamId: targetGoal.teamId,
      userId: targetGoal.userId,
      title: targetGoal.title,
      createdAt: targetGoal.createdAt,
      updatedAt: targetGoal.updatedAt,
    });
  }),

  // 목표 삭제
  http.delete(buildApiUrl(`${GOALS_API_PATH.base}/:goalId`), ({ params }) => {
    const { goalId } = params;
    const targetId = Number(goalId);

    const index = goalsState.findIndex((g) => String(g.id) === String(goalId));
    if (index !== -1) {
      goalsState.splice(index, 1);
    }

    return HttpResponse.json({ id: targetId }, { status: 200 });
  }),
];
