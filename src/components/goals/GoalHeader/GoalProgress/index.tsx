import ProgressRing from "@/components/ui/ProgressRing";

interface GoalProgressProps {
  totalCount: number;
  doneCount: number;
  percentage: number;
}

export default function GoalProgress({ totalCount, doneCount, percentage }: GoalProgressProps) {
  return (
    <div className="bg-primary-200 ratio-1 flex flex-1 flex-row items-center justify-between gap-24 rounded-md p-20 shadow-sm">
      <ProgressRing
        totalCount={totalCount || 1}
        doneCount={doneCount}
      />
      <div className="hidden w-full min-[500px]:block">
        <p className="text-title-xs text-primary-700 text-nowrap">목표 진행도</p>
        <p className="text-title-md text-primary-700">
          <span className="text-display text-primary-700">{percentage}</span>%
        </p>
      </div>
    </div>
  );
}
