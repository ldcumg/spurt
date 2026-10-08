import type { DropDownOption } from "@/components/ui/Dropdown";

export type NoteTodoOption = DropDownOption & {
  goalId: string | null;
};

interface MockNoteContext {
  selectedGoalId: string;
  selectedTodoId: string;
  goals: DropDownOption[];
  todos: NoteTodoOption[];
}

export const MOCK_NOTE_CONTEXT: MockNoteContext = {
  selectedGoalId: "goal-javascript-service",
  goals: [
    { id: "goal-javascript-service", label: "자바스크립트로 웹 서비스 만들기" },
    { id: "goal-design-system", label: "디자인 시스템 강의 듣기" },
    { id: "goal-portfolio", label: "프론트엔드 포트폴리오 완성하기" },
  ],
  selectedTodoId: "todo-programming-data",
  todos: [
    {
      id: "todo-programming-data",
      label: "프로그래밍과 데이터 in JavaScript",
      goalId: "goal-javascript-service",
    },
    {
      id: "todo-javascript-basics",
      label: "자바스크립트 기초 챕터1 듣기",
      goalId: "goal-javascript-service",
    },
    {
      id: "todo-design-system",
      label: "디자인 시스템 사례 조사하기",
      goalId: "goal-design-system",
    },
    {
      id: "todo-organize-notes",
      label: "분류되지 않은 학습 메모 정리하기",
      goalId: null,
    },
  ],
};
