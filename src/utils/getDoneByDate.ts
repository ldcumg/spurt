import type { TodoResponse } from "@/types/todos.types";

export interface DailyDoneStat {
  date: string;
  fullDate: string;
  count: number;
}

// 로컬 기준 "YYYY-MM-DD" 반환 헬퍼
function formatDateToYMD(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const date = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
}

export default function getDoneByDate(todos: TodoResponse[]): DailyDoneStat[] {
  const result: DailyDoneStat[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const fullDate = formatDateToYMD(d);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const date = String(d.getDate()).padStart(2, "0");

    result.push({
      date: `${month}/${date}`,
      fullDate,
      count: 0,
    });
  }

  todos.forEach((item) => {
    if (item.done && item.updatedAt) {
      const updatedDate = formatDateToYMD(new Date(item.updatedAt));
      const targetDay = result.find((day) => day.fullDate === updatedDate);

      if (targetDay) {
        targetDay.count += 1;
      }
    }
  });

  return result;
}
