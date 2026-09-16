import calc from "../calc";
interface ProgressProps {
  doneCount: number;
  totalCount: number;
  className?: string;
}

export default function ProgressBar({ doneCount, totalCount, className = "" }: ProgressProps) {
  // 0 미만이거나 100을 초과하는 값이 들어왔을 때 깨지지 않도록 방어 (0 ~ 100 고정)
  const progress = calc(doneCount, totalCount);

  return (
    <div className={`flex w-full items-center gap-12 ${className}`}>
      <div className="relative h-8 flex-1 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="bg-primary-500 h-full rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-title-sm text-primary-600">{progress}%</span>
    </div>
  );
}
