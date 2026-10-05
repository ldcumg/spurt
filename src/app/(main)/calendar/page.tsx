"use client";

import CalendarBody from "@/components/calendar/CalendarBody";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import DayHeader from "@/components/calendar/DayHeader";
import TodoForDate from "@/components/calendar/TodoForDate";
import type { CalendarWeeks } from "@/components/calendar/types";
import { getCalendarWeeks, groupTodosByDate } from "@/components/calendar/utils";
import { useAllTodoQuery } from "@/hooks/queries/todo/useTodoQueries";
import { useState } from "react";

export default function CalendarPage() {
  const today = new Date();
  const firstSunday = new Date(today);
  firstSunday.setDate(today.getDate() - today.getDay() - 14);
  const currentWeekCalendar = getCalendarWeeks(firstSunday);
  const [calendarWeeks, setCalendarWeeks] = useState<CalendarWeeks>(currentWeekCalendar);

  const [isMonthView, setIsMonthView] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  // FIXME -  임시
  const [selectedGoalId, _setSelectedGoalId] = useState<number | null>(null);

  const { data, isPending, isError, error } = useAllTodoQuery();
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const { todos } = data;
  const filteredTodoByGoal = selectedGoalId ? todos.filter((todo) => todo.goalId === selectedGoalId) : todos;
  const todoGroupedByDate = groupTodosByDate(filteredTodoByGoal);

  return (
    <div className="flex h-full w-full flex-col items-center gap-12 overflow-hidden overscroll-contain p-4 pb-100">
      <div className="flex h-50 items-center">
        <button className="">목표 필터</button>
      </div>

      <CalendarHeader
        calendarWeeks={calendarWeeks}
        isMonthView={isMonthView}
        setCalendarWeeks={setCalendarWeeks}
        setIsMonthView={setIsMonthView}
        currentWeekCalendar={currentWeekCalendar}
      />

      {/* 달력 */}
      <div className="flex min-h-480 w-full flex-col md:h-600 xl:h-700">
        <DayHeader />

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

      <TodoForDate
        selectedDate={selectedDate}
        todoGroupedByDate={todoGroupedByDate}
      />
    </div>
  );
}
