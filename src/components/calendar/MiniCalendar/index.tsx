import DayHeader from "../DayHeader";
import { getMonthDates } from "../utils";
import { Left, Right } from "@/assets/icons";
import clsx from "clsx";
import { useState } from "react";

interface MiniCalendarProps {
  selectedDate: Date | null;
  handleDateSelect: (date: Date | null) => void;
}

export default function MiniCalendar({ selectedDate, handleDateSelect }: MiniCalendarProps) {
  const [referenceDate, setReferenceDate] = useState(selectedDate ?? new Date());
  const calendar = getMonthDates(referenceDate);

  /** 이전 달로 이동 */
  const handlePreviousMonth = () => {
    setReferenceDate((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  /** 다음 달로 이동 */
  const handleNextMonth = () => {
    setReferenceDate((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <div className="absolute top-60 left-0 flex w-300 flex-col gap-4 bg-white">
      <div className="flex w-full flex-row justify-around">
        {/* 이전 달 이동 버튼 */}
        <button onClick={handlePreviousMonth}>
          <Left className="size-16 text-neutral-400" />
        </button>

        {/* 연도, 월 표시 */}
        <h4>
          {referenceDate.getFullYear()}년 {referenceDate.getMonth() + 1}월
        </h4>

        {/* 다음 달 이동 버튼 */}
        <button onClick={handleNextMonth}>
          <Right className="size-16 text-neutral-400" />
        </button>
      </div>

      <DayHeader />

      <div className="grid grid-cols-7 justify-items-center gap-y-4">
        {calendar.map((date, idx) => {
          const isSelectedDate = selectedDate && selectedDate.toDateString() === date?.toDateString();
          return (
            <div
              className={clsx(
                "flex size-28 items-center justify-center",
                isSelectedDate && "bg-primary-600 aspect-square rounded-full text-white",
              )}
              onClick={() => handleDateSelect(date)}
              key={idx}
            >
              {date?.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
