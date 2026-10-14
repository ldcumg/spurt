import { getNoteTodoGoalLabel } from "./useNoteTodoGoals";
import { describe, expect, it } from "vitest";

describe("getNoteTodoGoalLabel", () => {
  it("조회 상태에 맞는 목표 문구를 반환한다", () => {
    expect(getNoteTodoGoalLabel(undefined)).toBe("목표를 불러오는 중이에요.");
    expect(getNoteTodoGoalLabel({ status: "pending", goal: null })).toBe("목표를 불러오는 중이에요.");
    expect(getNoteTodoGoalLabel({ status: "error", goal: null })).toBe("목표 정보를 불러오지 못했어요.");
  });

  it("조회한 목표명 또는 목표 없음 문구를 반환한다", () => {
    expect(
      getNoteTodoGoalLabel({
        status: "success",
        goal: { id: 721, title: "프로젝트 완성" },
      }),
    ).toBe("프로젝트 완성");
    expect(getNoteTodoGoalLabel({ status: "success", goal: null })).toBe("연결된 목표 없음");
  });
});
