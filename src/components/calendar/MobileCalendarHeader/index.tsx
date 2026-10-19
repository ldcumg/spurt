import { THIS_WEEK_INDEX } from "../constants";
import type { CalendarWeeks } from "../types";
import { Left, Right } from "@/assets/icons";
import { moveMonth } from "@/components/calendar/utils";
import Button from "@/components/ui/Button";
import SelectGoalDropdown from "@/components/ui/SelectGoalDropdown";
import type { GoalListItem } from "@/types/goals.types";
import clsx from "clsx";

interface MobileCalendarHeaderProps {
  calendarWeeks: CalendarWeeks;
  isMonthView: boolean;
  setCalendarWeeks: React.Dispatch<React.SetStateAction<CalendarWeeks>>;
  selectToday: () => void;
  setIsMonthView: React.Dispatch<React.SetStateAction<boolean>>;
  currentWeekCalendar: CalendarWeeks;
  selectedGoal: GoalListItem | null;
  setSelectedGoal: React.Dispatch<React.SetStateAction<GoalListItem | null>>;
}

export default function MobileCalendarHeader({
  calendarWeeks,
  isMonthView,
  setCalendarWeeks,
  selectToday,
  setIsMonthView,
  currentWeekCalendar,
  selectedGoal,
  setSelectedGoal,
}: MobileCalendarHeaderProps) {
  /** 오늘로 이동 */
  const handlerClickToday = () => {
    setCalendarWeeks(currentWeekCalendar);
    selectToday();
  };

  return (
    <>
      <SelectGoalDropdown
        className="h-50 w-full px-56"
        selectedGoal={selectedGoal}
        setSelectedGoal={setSelectedGoal}
      />

      <div className="relative flex w-full flex-row items-center justify-between px-4">
        {/* 연도, 월 표시 */}
        <h2 className="text-title-sm">
          {isMonthView
            ? `${calendarWeeks[0][0].getFullYear()}년 ${calendarWeeks[0][0].getMonth() + 1}월`
            : `${calendarWeeks[THIS_WEEK_INDEX][0].getFullYear()}년 ${calendarWeeks[THIS_WEEK_INDEX][0].getMonth() + 1}월`}
        </h2>

        <span className="absolute left-1/2 flex -translate-x-1/2 flex-row gap-16">
          {/* 이전 달로 이동 */}
          <button onClick={() => setCalendarWeeks((prev) => moveMonth(prev, false))}>
            <Left className="size-20 text-neutral-400" />
          </button>

          {/* 오늘로 이동 */}
          <Button
            variant="outline"
            size="sm"
            onClick={handlerClickToday}
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
    </>
  );
}
