"use client";

import CalendarBody from "@/components/calendar/CalendarBody";
import DayHeader from "@/components/calendar/DayHeader";
import DesctopCalendarHeader from "@/components/calendar/DesktopCalendarHeader";
import MobileCalendarHeader from "@/components/calendar/MobileCalendarHeader";
import TodoForDate from "@/components/calendar/TodoForDate";
import type { CalendarWeeks } from "@/components/calendar/types";
import { getCalendarWeeks, groupTodosByDate } from "@/components/calendar/utils";
import { useAllTodoQuery } from "@/hooks/queries/todo/useTodoQueries";
import { useViewport } from "@/hooks/viewport/useViewport";
import type { GoalListItem } from "@/types/goals.types";
import { useState } from "react";

export default function CalendarPage() {
  // TODO - 커스텀 훅
  const today = new Date();
  const firstSunday = new Date(today);
  firstSunday.setDate(today.getDate() - today.getDay() - 14);
  const currentWeekCalendar = getCalendarWeeks(firstSunday);
  const [calendarWeeks, setCalendarWeeks] = useState<CalendarWeeks>(currentWeekCalendar);
  const { isDesktop } = useViewport();

  const [isMonthView, setIsMonthView] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedGoal, setSelectedGoal] = useState<GoalListItem | null>(null);

  const { data: todoData, isPending: isTodoPending, isError: isTodoError, error: Todoerror } = useAllTodoQuery();
  if (isTodoPending) return <div>Loading...</div>;
  if (isTodoError) return <div>Error: {Todoerror.message}</div>;
  const {
    data: { todos },
  } = todoData;
  const filteredTodoByGoal = selectedGoal ? todos.filter((todo) => todo.goalId === selectedGoal.id) : todos;
  const todoGroupedByDate = groupTodosByDate(filteredTodoByGoal);

  return (
    <div className="flex min-h-full w-full flex-col items-center gap-16 p-4 md:p-24 xl:py-40">
      {isDesktop ? (
        <DesctopCalendarHeader
          calendarWeeks={calendarWeeks}
          isMonthView={isMonthView}
          setCalendarWeeks={setCalendarWeeks}
          selectToday={() => setSelectedDate(today)}
          setIsMonthView={setIsMonthView}
          currentWeekCalendar={currentWeekCalendar}
          selectedGoal={selectedGoal}
          setSelectedGoal={setSelectedGoal}
        />
      ) : (
        <MobileCalendarHeader
          calendarWeeks={calendarWeeks}
          isMonthView={isMonthView}
          setCalendarWeeks={setCalendarWeeks}
          selectToday={() => setSelectedDate(today)}
          setIsMonthView={setIsMonthView}
          currentWeekCalendar={currentWeekCalendar}
          selectedGoal={selectedGoal}
          setSelectedGoal={setSelectedGoal}
        />
      )}

      {/* 달력 */}
      <div className="flex min-h-480 w-full flex-col md:h-600 xl:h-800">
        <DayHeader className="border" />

        <CalendarBody
          calendarWeeks={calendarWeeks}
          isMonthView={isMonthView}
          today={today}
          setCalendarWeeks={setCalendarWeeks}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          todoGroupedByDate={todoGroupedByDate}
        />
      </div>

      {isDesktop || (
        <TodoForDate
          selectedDate={selectedDate}
          todoGroupedByDate={todoGroupedByDate}
        />
      )}
    </div>
  );
}
