interface ProgressProps {
  percentage: number;
  className?: string;
}

export default function ProgressRing({ percentage, className = "" }: ProgressProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  const size = 100;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * clampedPercentage) / 100;

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
            className="text-neutral-200"
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
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{percentage}%</span>
      </div>
    </div>
  );
}
