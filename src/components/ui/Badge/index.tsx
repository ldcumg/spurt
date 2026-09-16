import { Goal } from "./mock";
export type BadgeType = "todo" | "done" | "goal" | "category";

const BADGE_CONFIG: Record<BadgeType, { label: string; style: string }> = {
  todo: {
    label: "TO DO",
    style: "bg-coral-light text-coral",
  },
  done: {
    label: "DONE",
    style: "bg-primary-100 text-primary-600",
  },
  goal: {
    label: "GOAL",
    style: "bg-blue-light text-blue",
  },
  category: {
    label: "CATEGORY",
    style: "bg-yellow-light text-yellow",
  },
};

interface BadgeProps {
  type: BadgeType;
  todoCount?: number;
  doneCount?: number;
  totalCount?: number;
  className?: string;
}

/**
 * @param type: 할 일의 상태를 넘겨주세요 (todo, done)
 * @param todoCount: todo 할 일의 갯수를 넘겨주세요 (ex. goal.todoCount)
 * @param totalCount: (done일 경우) 전체 할 일의 갯수를 넘겨주세요 (ex. goal.totalCount)
 * @param className: css 수정이 필요한 경우 사용
 */
export default function Badge({ type, todoCount, doneCount, totalCount, className = "" }: BadgeProps) {
  const currentBadge = BADGE_CONFIG[type];
  const displayCount =
    doneCount !== undefined
      ? doneCount
      : type === "done" && totalCount !== undefined && todoCount !== undefined
        ? totalCount - todoCount
        : type === "todo"
          ? todoCount
          : undefined;

  return (
    <div
      className={`text-caption inline-flex w-fit items-center justify-center gap-8 rounded-sm px-10 py-5 font-semibold ${currentBadge.style} ${className}`}
    >
      <p>{currentBadge.label}</p>
      {displayCount !== undefined ? <p>{displayCount}</p> : ""}
    </div>
  );
}
