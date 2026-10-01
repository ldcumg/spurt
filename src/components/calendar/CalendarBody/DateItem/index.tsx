import { THIS_WEEK_INDEX } from "../../constants";
import type { CalendarWeeks } from "../../types";
import { getCalendarWeeks, nextWeek, previousWeek } from "@/utils/calendar";
import clsx from "clsx";

interface DateItemProps {
  date: Date;
  today: Date;
  isMonthView: boolean;
  isThisWeek: boolean;
  isMounthViewOrThisWeek: boolean;
  isNextMonthFirstWeek: boolean;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setCalendarWeeks: React.Dispatch<React.SetStateAction<CalendarWeeks>>;
  weekIdx: number;
}

export default function DateItem({
  date,
  today,
  isMonthView,
  isThisWeek,
  isMounthViewOrThisWeek,
  isNextMonthFirstWeek,
  selectedDate,
  setSelectedDate,
  setCalendarWeeks,
  weekIdx,
}: DateItemProps) {
  const month = date.getMonth() + 1;
  const isToday = date.toDateString() === today.toDateString();

  // TODO - service 로직 연결 후 모듈화
  const handleClick = () => {
    const isPreviousWeek = weekIdx < THIS_WEEK_INDEX;
    const isNextWeek = weekIdx > THIS_WEEK_INDEX;

    if (isMounthViewOrThisWeek) {
      setSelectedDate(date);
      return;
    }

    if (isPreviousWeek) {
      setCalendarWeeks((prev) => previousWeek(prev));
      return;
    }

    if (isNextWeek) {
      setCalendarWeeks((prev) => nextWeek(prev));
      return;
    }
  };

  return (
    <div className={clsx("flex-1", isMounthViewOrThisWeek || "opacity-30")}>
      {/* 다음 연도, 달 표시 */}
      {isNextMonthFirstWeek && (
        <div className="h-50">
          {date.getDate() === 1 && (
            <button
              className="h-full w-full pl-8 text-start disabled:cursor-default"
              onClick={() => {
                const thisSunday = new Date(date);
                thisSunday.setDate(date.getDate() - date.getDay());

                setCalendarWeeks(getCalendarWeeks(thisSunday));
              }}
              disabled={!isMonthView}
            >
              <h3>{month === 1 ? `${date.getFullYear()}년 ${month}월` : `${month}월`}</h3>
            </button>
          )}
        </div>
      )}

      {/* 일 */}
      <div
        className={`flex w-full flex-col border p-4 hover:cursor-pointer ${isMonthView ? "h-80 md:h-100 xl:h-120" : isThisWeek ? "h-200 md:h-300 xl:h-400" : "h-40 md:h-60"}`}
        onClick={handleClick}
      >
        <h6
          className={clsx(
            `flex w-25 justify-center ${isMonthView ? "text-body-md" : isThisWeek ? "text-title-xs" : "text-body-sm"}`,
            isToday &&
              (selectedDate ? "rounded-full bg-neutral-500 text-white" : "bg-primary-500 rounded-full text-white"),
            selectedDate?.toDateString() === date.toDateString() && "bg-primary-500 rounded-full text-white",
            date.getDay() === 0 && "text-red-700",
            date.getDay() === 6 && "text-blue-700",
          )}
        >
          {date.getDate()}
        </h6>
        {/* TODO - 할 일 간소화 표시 */}
      </div>
    </div>
  );
}
