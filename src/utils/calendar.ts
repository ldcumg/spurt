/**
 * @returns YYYY-MM-DD
 */
export function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** 작은 달력 - 기준 날짜가 해당하는 월의 일들을 반환 */
export function getMonthDates(referenceDate: Date): (Date | null)[] {
  const referenceYear = referenceDate.getFullYear();
  const referenceMonth = referenceDate.getMonth();

  const firstDay = new Date(referenceYear, referenceMonth, 1).getDay();
  const lastDate = new Date(referenceYear, referenceMonth + 1, 0).getDate();

  return Array.from({ length: firstDay + lastDate }, (_, index) => {
    return index < firstDay ? null : new Date(referenceYear, referenceMonth, index - firstDay + 1);
  });
}
