import CalendarTodoItem from "../../CalendarTodoItem";
import { THIS_WEEK_INDEX } from "@/app/(main)/calendar/index.constants";
import type { CalendarWeeks } from "@/app/(main)/calendar/index.types";
import { getCalendarWeeks, nextWeek, previousWeek } from "@/app/(main)/calendar/index.utils";
import { CalendarDot, Plus } from "@/assets/icons";
import TodoFormTrigger from "@/components/ui/TodoFormTrigger";
import { useViewport } from "@/hooks/viewport/useViewport";
import type { TodoResponse } from "@/types/todos.types";
import clsx from "clsx";
import { Fragment } from "react";

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
  const sliceNumber = isMonthView || !isThisWeek ? 3 : isDesktop ? 10 : isTablet ? 5 : 3;

  const handleMonthClick = () => {
    const thisSunday = new Date(date);
    thisSunday.setDate(date.getDate() - date.getDay());

    setCalendarWeeks(getCalendarWeeks(thisSunday));
  };

  /** 날짜 클릭 */
  const handleDateClick = (todoFormOpen: () => void) => {
    const isPreviousWeek = weekIdx < THIS_WEEK_INDEX;
    const isNextWeek = weekIdx > THIS_WEEK_INDEX;

    if (isMounthViewOrThisWeek && isDesktop) {
      todoFormOpen();
      return;
    }

    if (isMounthViewOrThisWeek && !isDesktop) {
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
    <div className={clsx("min-w-0 flex-1", isMounthViewOrThisWeek || "opacity-30")}>
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
      <TodoFormTrigger
        aleadySelectedDate={date}
        renderItem={(todoFormOpen) => (
          <div
            className={`group relative flex w-full flex-col border p-4 hover:cursor-pointer ${isMonthView ? "h-70 md:h-100 xl:h-140" : isThisWeek ? "h-180 md:h-250 xl:h-400" : "h-50 md:h-60"}`}
            onClick={() => handleDateClick(todoFormOpen)}
          >
            <div className="flex">
              <h4
                className={clsx(
                  `flex aspect-square items-center justify-center ${isMonthView ? "text-body-md xl:text-body-lg" : isThisWeek ? "text-title-xs xl:text-title-sm" : "text-caption"}`,
                  date.getDay() === 0 && "text-red-700",
                  date.getDay() === 6 && "text-blue-700",
                  isToday && "xl:bg-primary-500 rounded-full bg-neutral-500 text-white",
                  isSelectedDate && "max-xl:bg-primary-500 max-xl:rounded-full max-xl:text-white",
                )}
              >
                {date.getDate()}
              </h4>
            </div>

            <div className="flex h-full min-w-0">
              {todoForDate && (
                <div
                  className={`flex w-full min-w-0 flex-col ${
                    isMonthView
                      ? "mt-8 px-8 md:mt-16 md:gap-8 md:px-8 xl:mt-0 xl:gap-0 xl:px-0"
                      : isThisWeek
                        ? "mt-12 gap-4 xl:px-4"
                        : "mt-4 px-4 md:mt-8 md:px-8 xl:px-12"
                  }`}
                >
                  <div
                    className={clsx(
                      "flex w-full min-w-0 gap-8",
                      isMonthView || !isThisWeek ? "flex-row" : "flex-col",
                      isMonthView && "xl:flex-col xl:gap-4",
                    )}
                  >
                    {todoForDate.slice(0, sliceNumber).map((todo) => {
                      const isDone = todo.done;
                      return (
                        <Fragment key={todo.id}>
                          {(isMonthView ? isDesktop : isThisWeek) ? (
                            <CalendarTodoItem
                              className={`${isMonthView ? "h-24" : "h-28 xl:h-32"}`}
                              todo={todo}
                            />
                          ) : (
                            <CalendarDot
                              className={`size-8 md:size-10 ${isDone ? "text-neutral-500" : "text-primary-500"}`}
                            />
                          )}
                        </Fragment>
                      );
                    })}
                  </div>

                  <div>
                    {todoForDate.length > sliceNumber && (
                      <span
                        className={`flex flex-row whitespace-nowrap text-neutral-400 ${
                          isMonthView ? "text-body-md xl:mx-auto" : isThisWeek ? "text-body-md mx-auto" : "text-caption"
                        }`}
                      >
                        +{todoForDate.length - sliceNumber}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {isDesktop && isMounthViewOrThisWeek && (
              <span className="pointer-events-none absolute top-8 right-8 hidden size-20 rounded-sm bg-neutral-300 p-4 group-hover:block group-has-[button:hover]:hidden">
                <Plus className="text-white" />
              </span>
            )}
          </div>
        )}
      />
    </div>
  );
}
