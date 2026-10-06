import type { CalendarWeeks } from "@/components/calendar/types";
import { nextWeek, previousWeek } from "@/components/calendar/utils";
import { useEffect, useRef } from "react";

/** 달력 휠 주 이동 훅 */
export const useCalendarWheel = (setCalendarWeeks: React.Dispatch<React.SetStateAction<CalendarWeeks>>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current || Math.abs(e.deltaY) < 25) return;

      isScrollingRef.current = true;

      setCalendarWeeks((prev) => (e.deltaY > 0 ? nextWeek(prev) : previousWeek(prev)));

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [setCalendarWeeks]);

  return containerRef;
};
