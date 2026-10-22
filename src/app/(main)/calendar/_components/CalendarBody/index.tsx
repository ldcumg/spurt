import { THIS_WEEK_INDEX } from "../../index.constants";
import { useCalendarWheel } from "../../index.hooks";
import type { CalendarWeeks } from "../../index.types";
import DateItem from "./DateItem";
import type { TodoResponse } from "@/types/todos.types";
import { formatDate } from "@/utils/calendar";

interface CalendarBodyProps {
  calendarWeeks: CalendarWeeks;
  isMonthView: boolean;
  today: Date;
  setCalendarWeeks: React.Dispatch<React.SetStateAction<CalendarWeeks>>;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  todoGroupedByDate: Record<string, TodoResponse[]>;
}

export default function CalendarBody({
  calendarWeeks,
  isMonthView,
  today,
  setCalendarWeeks,
  selectedDate,
  setSelectedDate,
  todoGroupedByDate,
}: CalendarBodyProps) {
  const containerRef = useCalendarWheel(setCalendarWeeks);
  return (
    <div
      className="flex flex-col"
      ref={containerRef}
    >
      {calendarWeeks.map((week, weekIdx) => {
        const isThisWeek = weekIdx === THIS_WEEK_INDEX;

        return (
          <div
            className="flex flex-row"
            key={`week-${weekIdx}`}
          >
            {/* 주 */}
            {week.map((date) => {
              const hasFirstDay = week.some((date) => date.getDate() === 1);
              const isNextMonthFirstWeek = hasFirstDay && (!isMonthView || date.getDate() <= 7);
              const isToday = date.toDateString() === today.toDateString();
              const isSelectedDate = selectedDate.toDateString() === date.toDateString();

              return (
                <DateItem
                  key={date.toDateString()}
                  date={date}
                  isToday={isToday}
                  isSelectedDate={isSelectedDate}
                  isMonthView={isMonthView}
                  isThisWeek={isThisWeek}
                  isNextMonthFirstWeek={isNextMonthFirstWeek}
                  setSelectedDate={setSelectedDate}
                  setCalendarWeeks={setCalendarWeeks}
                  weekIdx={weekIdx}
                  todoForDate={todoGroupedByDate[formatDate(date)]}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
