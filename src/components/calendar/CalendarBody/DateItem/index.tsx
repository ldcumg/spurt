import { THIS_WEEK_INDEX } from "../../constants";
import type { CalendarWeeks } from "../../types";
import { CalendarDot } from "@/assets/icons";
import { getCalendarWeeks, nextWeek, previousWeek } from "@/components/calendar/utils";
import { useViewport } from "@/hooks/viewport/useViewport";
import type { TodoResponse } from "@/types/todos.types";
import clsx from "clsx";

interface DateItemProps {
  date: Date;
  today: Date;
  isMonthView: boolean;
  isThisWeek: boolean;
  isMounthViewOrThisWeek: boolean;
  isNextMonthFirstWeek: boolean;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setCalendarWeeks: React.Dispatch<React.SetStateAction<CalendarWeeks>>;
  weekIdx: number;
  todoForDate?: TodoResponse[];
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
  todoForDate,
}: DateItemProps) {
  const month = date.getMonth() + 1;
  const isToday = date.toDateString() === today.toDateString();
  const { isDesktop } = useViewport();

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
        className={`flex w-full flex-col border p-4 hover:cursor-pointer ${isMonthView ? "h-70 md:h-100 xl:h-120" : isThisWeek ? "h-200 md:h-300 xl:h-400" : "h-40 md:h-60"}`}
        onClick={handleDateClick}
      >
        <h4
          className={clsx(
            `flex aspect-square w-25 justify-center ${isMonthView ? "text-body-md" : isThisWeek ? "text-title-xs" : "text-body-sm"}`,
            isToday &&
              (selectedDate ? "rounded-full bg-neutral-500 text-white" : "bg-primary-500 rounded-full text-white"),
            selectedDate?.toDateString() === date.toDateString() && "bg-primary-500 rounded-full text-white",
            date.getDay() === 0 && "text-red-700",
            date.getDay() === 6 && "text-blue-700",
          )}
        >
          {date.getDate()}
        </h4>

        <div className="flex h-full flex-col px-4 py-8">
          {todoForDate && (
            <>
              <div className="flex flex-row">
                {todoForDate.slice(0, 3).map((todo) => {
                  const isDone = todo.done;
                  return (
                    <span
                      className="h-full w-full"
                      key={todo.id}
                    >
                      {isDesktop ? (
                        todo.title
                      ) : (
                        <CalendarDot className={`size-8 ${isDone ? "text-neutral-500" : "text-primary-500"}`} />
                      )}
                    </span>
                  );
                })}
              </div>

              <div>
                {todoForDate.length > 3 && (
                  <span className="text-body-md text-neutral-400">+ {todoForDate.length - 3}</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
