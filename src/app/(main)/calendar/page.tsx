"use client";

import CalendarBody from "@/components/calendar/CalendarBody";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import DayHeader from "@/components/calendar/DayHeader";
import TodoForDate from "@/components/calendar/TodoForDate";
import type { CalendarWeeks } from "@/components/calendar/types";
import { getCalendarWeeks, groupTodosByDate } from "@/components/calendar/utils";
import SelectGoalDropdown from "@/components/ui/SelectGoalDropdown";
import { useAllGoalQuery } from "@/hooks/queries/goal/useGoalQueries";
import { useAllTodoQuery } from "@/hooks/queries/todo/useTodoQueries";
import type { GoalListItem } from "@/types/goals.types";
import { useState } from "react";

export default function CalendarPage() {
  const today = new Date();
  const firstSunday = new Date(today);
  firstSunday.setDate(today.getDate() - today.getDay() - 14);
  const currentWeekCalendar = getCalendarWeeks(firstSunday);
  const [calendarWeeks, setCalendarWeeks] = useState<CalendarWeeks>(currentWeekCalendar);

  const [isMonthView, setIsMonthView] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedGoal, setSelectedGoal] = useState<GoalListItem | null>(null);

  const { data: todoData, isPending: isTodoPending, isError: isTodoError, error: Todoerror } = useAllTodoQuery();
  const { data: goalData, isPending: isGoalPending, isError: isGoalError, error: goalError } = useAllGoalQuery();
  if (isTodoPending || isGoalPending) return <div>Loading...</div>;
  if (isTodoError || isGoalError) return <div>Error: {Todoerror?.message || goalError?.message}</div>;
  const {
    data: { todos },
  } = todoData;
  const {
    data: { goals },
  } = goalData;
  const filteredTodoByGoal = selectedGoal ? todos.filter((todo) => todo.goalId === selectedGoal.id) : todos;
  const todoGroupedByDate = groupTodosByDate(filteredTodoByGoal);

  return (
    <div className="flex h-full w-full flex-col items-center gap-12 overflow-hidden overscroll-contain p-4 pb-100">
      <div className="h-50 w-full px-60">
        <SelectGoalDropdown
          goalOptions={goals}
          selectedGoal={selectedGoal}
          setSelectedGoal={setSelectedGoal}
        />
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

      <TodoForDate
        selectedDate={selectedDate}
        todoGroupedByDate={todoGroupedByDate}
      />
    </div>
  );
}
