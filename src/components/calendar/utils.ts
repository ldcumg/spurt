import { LAST_WEEK_INDEX } from "./constants";
import type { CalendarWeeks, Week } from "./types";
import type { Todo } from "@/types/todos.types";

/**
 * sunday가 포함된 일요일 ~ 토요일 한 주를 반환
 * @returns [일, 월, 화, 수, 목, 금, 토]
 */
export function getWeek(sunday: Date): Week {
  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(sunday);
    current.setDate(sunday.getDate() + index);

    return current;
  }) as Week;
}

/**
 * firstSunday부터 5주를 반환
 * @returns [전전 주[], 전 주[], 이번 주[], 다음 주[], 다다음 주[]]
 */
export function getCalendarWeeks(firstSunday: Date): CalendarWeeks {
  return Array.from({ length: 5 }, (_, index) => {
    const weekStart = new Date(firstSunday);
    weekStart.setDate(weekStart.getDate() + index * 7);

    return getWeek(weekStart);
  }) as CalendarWeeks;
}

export function previousWeek(curruntWeeks: CalendarWeeks) {
  const firstWeek = curruntWeeks[0];
  const previousSunday = new Date(firstWeek[0]);
  previousSunday.setDate(previousSunday.getDate() - 7);
  const previousWeek = getWeek(previousSunday);

  return [previousWeek, ...curruntWeeks.slice(0, -1)] as CalendarWeeks;
}

export function nextWeek(curruntWeeks: CalendarWeeks) {
  const lastWeek = curruntWeeks[LAST_WEEK_INDEX];
  const nextSunday = new Date(lastWeek[0]);
  nextSunday.setDate(nextSunday.getDate() + 7);
  const nextWeek = getWeek(nextSunday);

  return [...curruntWeeks.slice(1), nextWeek] as CalendarWeeks;
}

export function moveMonth(curruntWeeks: CalendarWeeks, isNext: boolean) {
  const currentFirstWeek = curruntWeeks[0];
  const newSunday = new Date(currentFirstWeek[0]);
  newSunday.setDate(newSunday.getDate() + (isNext ? 7 : -7) * 5);
  const newWeeks = getCalendarWeeks(newSunday);

  return newWeeks as CalendarWeeks;
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function groupTodosByDate(todos: Todo[]): Record<string, Todo[]> {
  const grouped = todos.reduce<Record<string, Todo[]>>((acc, todo) => {
    const date = todo.dueDate.slice(0, 10);

    (acc[date] ??= []).push(todo);

    return acc;
  }, {});

  Object.values(grouped).forEach((todosForDate) => {
    todosForDate.sort((a, b) => Number(a.done) - Number(b.done));
  });

  return grouped;
}
