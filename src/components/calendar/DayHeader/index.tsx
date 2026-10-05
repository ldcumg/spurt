import { WEEKDAYS } from "../constants";
import clsx from "clsx";

export default function DayHeader() {
  return (
    <div className="flex border">
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
