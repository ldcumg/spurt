import TodoItem from "../../TodoItem";
import { THIS_WEEK_INDEX } from "../../constants";
import type { CalendarWeeks } from "../../types";
import { CalendarDot } from "@/assets/icons";
import { getCalendarWeeks, nextWeek, previousWeek } from "@/components/calendar/utils";
import { useViewport } from "@/hooks/viewport/useViewport";
import type { TodoResponse } from "@/types/todos.types";
import clsx from "clsx";

interface DateItemProps {
  date: Date;
  isToday: boolean;
  isMonthView: boolean;
  isThisWeek: boolean;
  isNextMonthFirstWeek: boolean;
  isSelectedDate: boolean;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setCalendarWeeks: React.Dispatch<React.SetStateAction<CalendarWeeks>>;
  weekIdx: number;
  todoForDate?: TodoResponse[];
}

export default function DateItem({
  date,
  isToday,
  isMonthView,
  isThisWeek,
  isNextMonthFirstWeek,
  isSelectedDate,
  setSelectedDate,
  setCalendarWeeks,
  weekIdx,
  todoForDate,
}: DateItemProps) {
  const month = date.getMonth() + 1;
  const isMounthViewOrThisWeek = isMonthView || isThisWeek;
  const { isDesktop, isTablet } = useViewport();
  const sliceNumber = isMonthView || !isThisWeek ? 3 : isDesktop ? 10 : isTablet ? 6 : 4;

  const handleMonthClick = () => {
    const thisSunday = new Date(date);
    thisSunday.setDate(date.getDate() - date.getDay());

    setCalendarWeeks(getCalendarWeeks(thisSunday));
  };

  /** 날짜 클릭 */
  const handleDateClick = () => {
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
              onClick={handleMonthClick}
              disabled={!isMonthView}
            >
              <h3 className="text-title-xs xl:text-title-sm whitespace-pre-line">
                {month === 1 ? `${date.getFullYear()}년\n${month}월` : `${month}월`}
              </h3>
            </button>
          )}
        </div>
      )}

      {/* 일 */}
      <div
        className={`flex w-full flex-col border p-4 hover:cursor-pointer ${isMonthView ? "h-70 md:h-100 xl:h-140" : isThisWeek ? "h-200 md:h-300 xl:h-400" : "h-40 md:h-60"}`}
        onClick={handleDateClick}
      >
        <h4
          className={clsx(
            `flex aspect-square w-25 items-center justify-center ${isMonthView ? "text-body-md" : isThisWeek ? "text-title-xs" : "text-body-sm"}`,
            date.getDay() === 0 && "text-red-700",
            date.getDay() === 6 && "text-blue-700",
            (isToday || isSelectedDate) &&
              `rounded-full text-white ${isSelectedDate ? "bg-primary-500" : "bg-neutral-500"}`,
          )}
        >
          {date.getDate()}
        </h4>

        <div
          className={`flex h-full px-4 py-8 md:gap-8 md:py-12 xl:gap-0 xl:py-4 ${isMonthView || isThisWeek ? "flex-col" : "flex-row justify-around"}`}
        >
          {todoForDate && (
            <>
              <div
                className={clsx(
                  `flex items-center ${(isDesktop && isMonthView) || (!isMonthView && isThisWeek) ? "flex-col" : "flex-row"}`,
                  isMonthView || isThisWeek ? "gap-4" : "gap-16",
                )}
              >
                {todoForDate.slice(0, sliceNumber).map((todo) => {
                  const isDone = todo.done;
                  return (
                    <span
                      className="h-full w-full"
                      key={todo.id}
                    >
                      {(isDesktop && isMonthView) || (!isMonthView && isThisWeek) ? (
                        <TodoItem
                          className={`${isMonthView ? "h-24" : "h-30"}`}
                          todo={todo}
                        />
                      ) : (
                        <CalendarDot className={`size-8 ${isDone ? "text-neutral-500" : "text-primary-500"}`} />
                      )}
                    </span>
                  );
                })}
              </div>

              <div>
                {todoForDate.length > sliceNumber && (
                  <span className="text-body-md text-neutral-400">+ {todoForDate.length - sliceNumber}</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
