"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GetGoalListParams, GoalListItem, GoalListResponse } from "@/types/goals.types";
import { clientFetcher } from "@/lib/axios/clientFetcher";
import { GOALS_API_PATH } from "@/constants/apiEndpoints";
import Link from "next/link";

// TODO: 목표 상세 페이지 추가 시 usePathname으로 대체
const ACTIVE_GOAL_ID = 1;

export default function GoalSection() {
  const [goalList, setGoalList] = useState<GoalListItem[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    async function fetchGoalList() {
      try {
        const params: GetGoalListParams = { limit: 10 };
        const goalRes = await clientFetcher.get<GoalListResponse>(GOALS_API_PATH.base, { params });

        if (goalRes.data.goals && goalRes.data.goals.length > 0) {
          setGoalList(goalRes.data.goals);
        }
        console.log(pathname);
      } catch (error) {
        console.error("목표 호출 실패", error);
      }
    }
    fetchGoalList();
  }, []);

  return (
    <ul className="flex max-h-174 flex-col gap-4 overflow-y-auto">
      {goalList.map((goal) => (
        <li key={goal.id}>
          <Link
            key={goal.id}
            href={`/goals/${goal.id}`}
          >
            <button
              type="button"
              className={`text-body-md w-full truncate rounded-lg p-12 text-left ${
                goal.id === ACTIVE_GOAL_ID ? "bg-primary-100 text-primary-600" : "hover:bg-primary-50 text-neutral-700"
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
