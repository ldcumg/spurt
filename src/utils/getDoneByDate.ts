import type { TodoItem } from "@/types/typeTodos";

export interface DailyDoneStat {
  date: string;
  fullDate: string;
  count: number;
}

export default function getDoneByDate(todos: TodoItem[]): DailyDoneStat[] {
  const result: DailyDoneStat[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const date = String(d.getDate()).padStart(2, "0");
    const fullDate = `${year}-${month}-${date}`;

    result.push({
      fullDate,
      date: `${month}/${date}`,
      count: 0,
    });
  }

  todos.forEach((item) => {
    if (item.done && item.updatedAt) {
      // "2026-09-17T09:00:00.000Z" -> "2026-09-17" 추출
      const updatedDate = item.updatedAt.slice(0, 10);
      const targetDay = result.find((day) => day.fullDate === updatedDate);

      if (targetDay) {
        targetDay.count += 1;
      }
    }
  });

  return result;
}
