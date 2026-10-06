"use client";

import { validateDueDate } from "../../utils";
import { Calendar } from "@/assets/icons";
import MiniCalendar from "@/components/calendar/MiniCalendar";
import { useClickOutside } from "@/hooks/disclosure/useClickOutside";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";

interface DateInputProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  error?: string;
  setError: (errorMassage: string) => void;
}

export default function DateInput({ selectedDate, setSelectedDate, error, setError }: DateInputProps) {
  const { isOpen: isCalendarOpen, close: calendarClose, toggle: calendarToggle } = useDisclosure();
  const containerRef = useClickOutside(() => {
    validateDueDate(selectedDate, setError);
    calendarClose();
  });

  /** 날짜 선택 */
  const handleDateSelect = (date: Date | null) => {
    if (!date) return;
    validateDueDate(date, setError);
    setSelectedDate(date);
    calendarClose();
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <label className="text-title-xs">마감기한</label>
      <div
        className={`text-body-lg relative h-48 w-full rounded-lg border bg-white px-16 outline-none ${error ? "border-error" : "border-input-border focus:border-primary-500"}`}
        ref={containerRef}
      >
        <button
          className="flex h-full w-full flex-row items-center gap-8"
          onClick={calendarToggle}
          type="button"
        >
          <Calendar className="size-24" />
          {selectedDate
            ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
            : "날짜를 선택해 주세요"}
        </button>

        {error && <p className="text-body-md text-error">{error}</p>}

        {isCalendarOpen && (
          <MiniCalendar
            selectedDate={selectedDate}
            handleDateSelect={handleDateSelect}
          />
        )}
      </div>
    </div>
  );
}
