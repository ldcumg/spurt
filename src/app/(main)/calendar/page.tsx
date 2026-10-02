"use client";

import CalendarBody from "@/components/calendarTemp/CalendarBody";
import CalendarHeader from "@/components/calendarTemp/CalendarHeader";
import DayHeader from "@/components/calendarTemp/DayHeader";
import type { CalendarWeeks } from "@/components/calendarTemp/types";
import { useCalendarWheel } from "@/hooks/calendar/useCalendarWheel";
import { getCalendarWeeks } from "@/utils/calendar";
import { useState } from "react";

export default function CalendarPage() {
  const today = new Date();
  const firstSunday = new Date(today);
  firstSunday.setDate(today.getDate() - today.getDay() - 14);
  const currentWeekCalendar = getCalendarWeeks(firstSunday);
  const [calendarWeeks, setCalendarWeeks] = useState<CalendarWeeks>(currentWeekCalendar);
  const [isMonthView, setIsMonthView] = useState<boolean>(true);
  const containerRef = useCalendarWheel(setCalendarWeeks);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div
      className="flex h-full w-full flex-col items-center gap-12 overscroll-contain p-4"
      ref={containerRef}
    >
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
      <div className="flex h-500 w-full flex-col md:h-600 xl:h-700">
        <DayHeader />

        <CalendarBody
          calendarWeeks={calendarWeeks}
          isMonthView={isMonthView}
          today={today}
          setCalendarWeeks={setCalendarWeeks}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
