"use client";

import { Calendar } from "@/assets/icons";
import MiniCalendar from "@/components/calendar/MiniCalendar";
import { useClickOutside } from "@/hooks/disclosure/useClickOutside";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";

interface DateInputProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function DateInput({ selectedDate, setSelectedDate }: DateInputProps) {
  const { isOpen, close, toggle } = useDisclosure();
  const containerRef = useClickOutside(close);

  return (
    <div className="flex w-full flex-col gap-8">
      <label className="text-title-xs">마감기한</label>
      <div
        className="text-body-lg relative h-48 w-full rounded-lg border bg-white px-16 outline-none"
        ref={containerRef}
      >
        <button
          className="flex h-full w-full flex-row items-center gap-8"
          onClick={toggle}
        >
          <Calendar className="size-24" />
          {selectedDate
            ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
            : "날짜를 선택해 주세요"}
        </button>
        {isOpen && (
          <MiniCalendar
            close={close}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
      </div>
    </div>
  );
}
