"use client";

import { Left, Right } from "@/assets/icons";
import { THIS_WEEK_INDEX, WEEKDAYS } from "@/components/calendar/constants";
import type { CalendarWeeks } from "@/components/calendar/types";
import Button from "@/components/ui/Button";
import { getCalendarWeeks, previousWeek, nextWeek, moveMonth } from "@/utils/calendar";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function CalendarPage() {
  const today = new Date();
  const firstSunday = new Date(today);
  firstSunday.setDate(today.getDate() - today.getDay() - 14);
  const currentWeekCalendar = getCalendarWeeks(firstSunday);
  const [calendarWeeks, setCalendarWeeks] = useState<CalendarWeeks>(currentWeekCalendar);
  const [isMonthView, setIsMonthView] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current || Math.abs(e.deltaY) < 25) return;

      isScrollingRef.current = true;
      setCalendarWeeks((prev) => (e.deltaY > 0 ? nextWeek : previousWeek)(prev));

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className="flex h-full w-full flex-col items-center gap-12 overscroll-contain p-4"
      ref={containerRef}
    >
      <div className="flex h-50 items-center">
        <button className="">목표 필터</button>
      </div>
      <div className="relative flex w-full flex-row items-center justify-between px-4">
        <span className="flex flex-row">
          <h2 className="text-title-sm">
            {isMonthView
              ? `${calendarWeeks[0][0].getFullYear()}년 ${calendarWeeks[0][0].getMonth() + 1}월`
              : `${calendarWeeks[THIS_WEEK_INDEX][0].getFullYear()}년 ${calendarWeeks[THIS_WEEK_INDEX][0].getMonth() + 1}월`}
          </h2>
        </span>

        <div className="absolute left-1/2 flex -translate-x-1/2 flex-row gap-8">
          <button onClick={() => setCalendarWeeks((prev) => moveMonth(prev, false))}>
            <Left className="size-20 text-neutral-400" />
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCalendarWeeks(currentWeekCalendar)}
          >
            오늘
          </Button>
          <button onClick={() => setCalendarWeeks((prev) => moveMonth(prev, true))}>
            <Right className="size-20 text-neutral-400" />
          </button>
        </div>

        <button onClick={() => setIsMonthView((prev) => !prev)}>
          <span className={clsx("rounded-2xl px-6", isMonthView && "bg-primary-500 text-white")}>월간</span>
          <span className={clsx("rounded-2xl px-6", isMonthView || "bg-primary-500 text-white")}>주간</span>
        </button>
      </div>

      {/* 달력 */}
      <div className="flex h-500 w-full flex-col md:h-600 xl:h-700">
        {/* 요일 헤더 */}
        <div className="flex border">
          {WEEKDAYS.map((day) => (
            <span
              className={clsx(
                "flex-1 text-center",
                day === WEEKDAYS[0] && "text-red-700",
                day === WEEKDAYS[6] && "text-blue-700",
              )}
              key={day}
            >
              {day}
            </span>
          ))}
        </div>

        <div className="flex flex-col">
          {/* 주 */}
          {calendarWeeks.map((week, weekIdx) => {
            const isThisWeek = weekIdx === THIS_WEEK_INDEX;
            const isMounthViewOrThisWeek = isMonthView || isThisWeek;

            return (
              <div
                className="flex flex-row"
                key={`week-${weekIdx}`}
              >
                {/* 일 */}
                {week.map((date) => {
                  const month = date.getMonth() + 1;
                  const isToday = date.toDateString() === today.toDateString();
                  const hasFirstDay = week.some((date) => date.getDate() === 1);
                  const isNextMonthFirstWeek = hasFirstDay && (!isMonthView || date.getDate() <= 7);

                  return (
                    <div
                      className={clsx("flex-1", isMounthViewOrThisWeek || "opacity-30")}
                      key={date.toDateString()}
                    >
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

                      <div
                        className={clsx(
                          `flex w-full flex-col border p-4 hover:cursor-pointer ${isMonthView ? "h-80 md:h-100 xl:h-120" : isThisWeek ? "h-200 md:h-300 xl:h-400" : "h-40 md:h-60"}`,
                        )}
                        onClick={() => {
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
                        }}
                      >
                        <h6
                          className={clsx(
                            `flex w-25 justify-center ${isMonthView ? "text-body-md" : isThisWeek ? "text-title-xs" : "text-body-sm"}`,
                            isToday &&
                              (selectedDate
                                ? "rounded-full bg-neutral-500 text-white"
                                : "bg-primary-500 rounded-full text-white"),
                            selectedDate?.toDateString() === date.toDateString() &&
                              "bg-primary-500 rounded-full text-white",
                            date.getDay() === 0 && "text-red-700",
                            date.getDay() === 6 && "text-blue-700",
                          )}
                        >
                          {date.getDate()}
                        </h6>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
