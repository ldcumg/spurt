/** year, month에 해단하는 월의 일들을 반환 */
export function getMonthDates(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: firstDay + lastDate }, (_, index) => {
    return index < firstDay ? null : new Date(year, month, index - firstDay + 1);
  });
}
