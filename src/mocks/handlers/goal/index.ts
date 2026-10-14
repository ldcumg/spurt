import { goalMocks } from "./mocks";
import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import { http, HttpResponse } from "msw";

export const goalHandlers = (buildApiUrl: (path: string) => string) => [
  // 목표 목록 조회
  http.get(buildApiUrl(GOALS_API_PATH.base), () => {
    return HttpResponse.json({
      goals: goalMocks.goals,
      nextCursor: goalMocks.nextCursor,
      totalCount: goalMocks.goals.length,
    });
  }),

  // 목표 수정 (PATCH /api/goals/:goalId)
  http.patch(buildApiUrl(`${GOALS_API_PATH.base}/:goalId`), async ({ params, request }) => {
    const { goalId } = params;
    const body = (await request.json()) as { title?: string };

    if (!body.title || !body.title.trim()) {
      return HttpResponse.json({ message: "목표 제목은 필수입니다.", code: "INVALID_TITLE" }, { status: 400 });
    }

    const targetGoal = goalMocks.goals.find((goal) => String(goal.id) === String(goalId));
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
];
