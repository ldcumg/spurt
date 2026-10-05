import { WEEKDAYS } from "../constants";
import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";

interface DayHeaderProps {
  className?: string;
}

export default function DayHeader({ className }: DayHeaderProps) {
  return (
    <div className={twMerge("flex", className)}>
      {WEEKDAYS.map((day) => (
        <span
          className={clsx(
            "flex-1 text-center",
            day === WEEKDAYS[0] && "text-red-700",
            day === WEEKDAYS[6] && "text-blue-700",
          )}
          key={day}
        >
          {day}
        </span>
      ))}
    </div>
  );
}
