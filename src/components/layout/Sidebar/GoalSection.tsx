"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGoalContext } from "@/hooks/state/goal/useGoalContext";
import { useGoalListQuery } from "@/hooks/queries/goal/useGoalQueries";
import { useQueryClient } from "@tanstack/react-query";
import { goalQueryOptions } from "@/hooks/queries/goal";

// TODO: 목표 상세 페이지 추가 시 usePathname으로 대체 (완료: 유진)

/**
 * /goals/:id 패턴에서 goalId를 추출합니다.
 * @example getGoalIdFromPath("/goals/12") // "12"
 * @example getGoalIdFromPath("/goals")    // null
 */
function getGoalIdFromPath(pathname: string): string | null {
  const match = pathname.match(/\/goals\/(\d+)/);
  return match ? match[1] : null;
}

export default function GoalSection() {
  const pathname = usePathname();
  const pathId = Number(getGoalIdFromPath(pathname));
  const queryClient = useQueryClient();

  // 목표를 눌렀을 때 최근 목표 ID로 저장해 줄 함수
  const setGoalId = useGoalContext((state) => state.setGoalId);

  const { data: goalData, isLoading } = useGoalListQuery({ limit: 10 });
  const goalList = goalData && "goals" in goalData ? goalData.goals : [];

  const handlePrefetchGoal = (targetGoalId: number) => {
    void queryClient.query(goalQueryOptions.detail(targetGoalId)).catch((error: unknown) => {
      console.error("목표 프리패치 실패:", error);
    });
  };

  if (isLoading) {
    return <div className="text-body-sm p-12 text-neutral-400">목표 불러오는 중...</div>;
  }

  return (
    <ul className="flex max-h-174 flex-col gap-4 overflow-y-auto">
      {goalList.map((goal) => (
        <li key={goal.id}>
          <Link
            key={goal.id}
            href={`/goals/${goal.id}`}
            onClick={() => setGoalId(goal.id)} // 클릭 시 최근 목표 ID 스토어에 기록
            onMouseEnter={() => handlePrefetchGoal(goal.id)} // 마우스 올리면 프리패치
          >
            <button
              type="button"
              className={`text-body-md w-full truncate rounded-lg p-12 text-left ${
                goal.id === pathId ? "bg-primary-100 text-primary-600" : "hover:bg-primary-50 text-neutral-700"
              }`}
            >
              {goal.title}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
