import { THIS_WEEK_INDEX } from "../../index.constants";
import type { CalendarWeeks } from "../../index.types";
import { moveMonth } from "../../index.utils";
import { Left, Right } from "@/assets/icons";
import Button from "@/components/ui/Button";
import SelectGoalDropdown from "@/components/ui/SelectGoalDropdown";
import type { TodoGoalSummary } from "@/types/todos.types";
import clsx from "clsx";

interface DesktopCalendarHeaderProps {
  calendarWeeks: CalendarWeeks;
  isMonthView: boolean;
  setCalendarWeeks: React.Dispatch<React.SetStateAction<CalendarWeeks>>;
  selectToday: () => void;
  setIsMonthView: React.Dispatch<React.SetStateAction<boolean>>;
  currentWeekCalendar: CalendarWeeks;
  selectedGoal: TodoGoalSummary | null;
  setSelectedGoal: React.Dispatch<React.SetStateAction<TodoGoalSummary | null>>;
}

export default function DesktopCalendarHeader({
  calendarWeeks,
  isMonthView,
  setCalendarWeeks,
  selectToday,
  setIsMonthView,
  currentWeekCalendar,
  selectedGoal,
  setSelectedGoal,
}: DesktopCalendarHeaderProps) {
  /** 오늘로 이동 */
  const handlerClickToday = () => {
    setCalendarWeeks(currentWeekCalendar);
    selectToday();
  };

  return (
    <div className="relative flex w-full flex-row items-center justify-between px-4">
      {/* 연도, 월 표시 */}
      <h2 className="text-title-md">
        {isMonthView
          ? `${calendarWeeks[0][0].getFullYear()}년 ${calendarWeeks[0][0].getMonth() + 1}월`
          : `${calendarWeeks[THIS_WEEK_INDEX][0].getFullYear()}년 ${calendarWeeks[THIS_WEEK_INDEX][0].getMonth() + 1}월`}
      </h2>

      {/* 뷰 전환 */}
      <button
        className="text-body-lg absolute left-[20%]"
        onClick={() => setIsMonthView((prev) => !prev)}
      >
        <span className={clsx("rounded-2xl px-6", isMonthView && "bg-primary-500 text-white")}>월간</span>
        <span className={clsx("rounded-2xl px-6", isMonthView || "bg-primary-500 text-white")}>주간</span>
      </button>

      <span className="absolute left-1/2 flex -translate-x-1/2 flex-row gap-16">
        {/* 이전 달로 이동 */}
        <button onClick={() => setCalendarWeeks((prev) => moveMonth(prev, false))}>
          <Left className="size-30 text-neutral-400" />
        </button>

        {/* 오늘로 이동 */}
        <Button
          variant="outline"
          size="md"
          onClick={handlerClickToday}
        >
          오늘
        </Button>

        {/* 다음 달로 이동 */}
        <button onClick={() => setCalendarWeeks((prev) => moveMonth(prev, true))}>
          <Right className="size-30 text-neutral-400" />
        </button>
      </span>

      <SelectGoalDropdown
        className="h-50 w-250 xl:w-350"
        selectedGoal={selectedGoal}
        setSelectedGoal={setSelectedGoal}
      />
    </div>
  );
}
