import { THIS_WEEK_INDEX } from "../constants";
import type { CalendarWeeks } from "../types";
import DateItem from "./DateItem";

interface CalendarBodyProps {
  calendarWeeks: CalendarWeeks;
  isMonthView: boolean;
  today: Date;
  setCalendarWeeks: React.Dispatch<React.SetStateAction<CalendarWeeks>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function CalendarBody({
  calendarWeeks,
  isMonthView,
  today,
  setCalendarWeeks,
  selectedDate,
  setSelectedDate,
}: CalendarBodyProps) {
  return (
    <div className="flex flex-col">
      {calendarWeeks.map((week, weekIdx) => {
        const isThisWeek = weekIdx === THIS_WEEK_INDEX;
        const isMounthViewOrThisWeek = isMonthView || isThisWeek;

        return (
          <div
            className="flex flex-row"
            key={`week-${weekIdx}`}
          >
            {/* 주 */}
            {week.map((date) => {
              const hasFirstDay = week.some((date) => date.getDate() === 1);
              const isNextMonthFirstWeek = hasFirstDay && (!isMonthView || date.getDate() <= 7);

              return (
                <DateItem
                  key={date.toDateString()}
                  date={date}
                  today={today}
                  isMonthView={isMonthView}
                  isThisWeek={isThisWeek}
                  isMounthViewOrThisWeek={isMounthViewOrThisWeek}
                  isNextMonthFirstWeek={isNextMonthFirstWeek}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  setCalendarWeeks={setCalendarWeeks}
                  weekIdx={weekIdx}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
