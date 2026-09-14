interface ProgressProps{
    percentage: number;
    className?: string;
}

export default function ProgressBar({percentage, className=""}:ProgressProps){
    // 0 미만이거나 100을 초과하는 값이 들어왔을 때 깨지지 않도록 방어 (0 ~ 100 고정)
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    return(
    <div className={`flex items-center gap-12 w-full ${className}`}>
        <div className="relative flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 rounded-full" style={{width:`${clampedPercentage}%`}} />
        </div>
        <span className="text-title-sm text-primary-600">{percentage}%</span>
    </div>
    );
}