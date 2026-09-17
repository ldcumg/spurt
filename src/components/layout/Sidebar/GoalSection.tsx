import { MOCK_GOALS } from "./mock";

// TODO: 목표 상세 페이지 추가 시 usePathname으로 대체
const ACTIVE_GOAL_ID = 1;

export default function GoalSection() {
  return (
    <ul className="flex max-h-174 flex-col gap-4 overflow-y-auto">
      {MOCK_GOALS.map((goal) => (
        <li key={goal.id}>
          <button
            type="button"
            className={`text-body-md w-full truncate rounded-lg p-12 text-left ${
              goal.id === ACTIVE_GOAL_ID ? "bg-primary-100 text-primary-600" : "hover:bg-primary-50 text-neutral-700"
            }`}
          >
            {goal.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
