import { THIS_WEEK_INDEX } from "../constants";
import type { CalendarWeeks } from "../types";
import { Left, Right } from "@/assets/icons";
import Button from "@/components/ui/Button";
import { moveMonth } from "@/utils/calendar";
import clsx from "clsx";

interface CalendarHeaderProps {
  calendarWeeks: CalendarWeeks;
  isMonthView: boolean;
  setCalendarWeeks: React.Dispatch<React.SetStateAction<CalendarWeeks>>;
  setIsMonthView: React.Dispatch<React.SetStateAction<boolean>>;
  currentWeekCalendar: CalendarWeeks;
}

export default function CalendarHeader({
  calendarWeeks,
  isMonthView,
  setCalendarWeeks,
  setIsMonthView,
  currentWeekCalendar,
}: CalendarHeaderProps) {
  return (
    <div className="relative flex w-full flex-row items-center justify-between px-4">
      {/* 연도, 월 표시 */}
      <h2 className="text-title-sm">
        {isMonthView
          ? `${calendarWeeks[0][0].getFullYear()}년 ${calendarWeeks[0][0].getMonth() + 1}월`
          : `${calendarWeeks[THIS_WEEK_INDEX][0].getFullYear()}년 ${calendarWeeks[THIS_WEEK_INDEX][0].getMonth() + 1}월`}
      </h2>

      <span className="absolute left-1/2 flex -translate-x-1/2 flex-row gap-8">
        {/* 이전 달로 이동 */}
        <button onClick={() => setCalendarWeeks((prev) => moveMonth(prev, false))}>
          <Left className="size-20 text-neutral-400" />
        </button>

        {/* 오늘로 이동 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCalendarWeeks(currentWeekCalendar)}
        >
          오늘
        </Button>

        {/* 다음 달로 이동 */}
        <button onClick={() => setCalendarWeeks((prev) => moveMonth(prev, true))}>
          <Right className="size-20 text-neutral-400" />
        </button>
      </span>

      {/* 뷰 전환 */}
      <button onClick={() => setIsMonthView((prev) => !prev)}>
        <span className={clsx("rounded-2xl px-6", isMonthView && "bg-primary-500 text-white")}>월간</span>
        <span className={clsx("rounded-2xl px-6", isMonthView || "bg-primary-500 text-white")}>주간</span>
      </button>
    </div>
  );
}
