import calc from "../../../utils/calc";
interface ProgressProps {
  doneCount: number;
  totalCount: number;
  className?: string;
}
/**
 *
 * @param doneCount : 완료된 할 일 갯수
 * @param totalCount : 총 할 일 갯수
 */
export default function ProgressRing({ doneCount, totalCount, className = "" }: ProgressProps) {
  const progress = calc(doneCount, totalCount);

  const size = 100;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div className={`w-[${size}%] h-[${size}%] relative flex items-center justify-center`}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={`-rotate-90 transform ${className}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            stroke="currentColor"
            className="text-neutral-100"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-primary-500 transition-all duration-300"
          />
        </svg>
        <span className="text-title-sm absolute inset-0 flex items-center justify-center">{progress}%</span>
      </div>
    </div>
  );
}
