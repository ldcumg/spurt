"use client";

import MobileNavigation from "../components/MobileNavigation";
import NoteEditor from "./components/NoteEditor";
import NoteMetaPanel from "./components/NoteMetaPanel";
import NoteWriteHeader, { NoteActions } from "./components/NoteWriteHeader";
import { MOCK_NOTE_CONTEXT, type NoteTodoOption } from "./mock";
import type { DropDownOption } from "@/components/ui/Dropdown";
import ROUTES from "@/constants/routes";
import type { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const EMPTY_NOTE_CONTENT: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

const INITIAL_SELECTED_GOAL_ID = MOCK_NOTE_CONTEXT.goals.some((goal) => goal.id === MOCK_NOTE_CONTEXT.selectedGoalId)
  ? MOCK_NOTE_CONTEXT.selectedGoalId
  : (MOCK_NOTE_CONTEXT.goals[0]?.id ?? "");

const INITIAL_SELECTED_TODO_ID = MOCK_NOTE_CONTEXT.todos.some(
  (todo) => todo.id === MOCK_NOTE_CONTEXT.selectedTodoId && todo.goalId === INITIAL_SELECTED_GOAL_ID,
)
  ? MOCK_NOTE_CONTEXT.selectedTodoId
  : "";

const getLinkUrlError = (value: string) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return "";

  try {
    const url = new URL(trimmedValue);
    if (url.protocol === "http:" || url.protocol === "https:") return "";
  } catch {
    // URL 생성에 실패하면 아래의 공통 오류 메시지를 반환한다.
  }

  return "http:// 또는 https://로 시작하는 올바른 링크를 입력해 주세요.";
};

const formatNoteDate = (date: Date) =>
  `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`;

const formatCreatedAt = (date: Date) => {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return `${formatNoteDate(date)} (${weekdays[date.getDay()]}) ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
};

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent>(EMPTY_NOTE_CONTENT);
  const [goals, setGoals] = useState<DropDownOption[]>([...MOCK_NOTE_CONTEXT.goals]);
  const [todos, setTodos] = useState<NoteTodoOption[]>([...MOCK_NOTE_CONTEXT.todos]);
  const [selectedGoalId, setSelectedGoalId] = useState(INITIAL_SELECTED_GOAL_ID);
  const [selectedTodoId, setSelectedTodoId] = useState(INITIAL_SELECTED_TODO_ID);
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkUrlTouched, setIsLinkUrlTouched] = useState(false);
  const [createdAt] = useState(() => new Date());
  const todoOptions = useMemo<DropDownOption[]>(() => {
    const visibleTodos = todos.filter((todo) => todo.goalId === selectedGoalId);

    return visibleTodos.map(({ id, label }) => ({ id, label }));
  }, [selectedGoalId, todos]);
  const linkUrlError = getLinkUrlError(linkUrl);
  const canSubmit = Boolean(selectedGoalId && selectedTodoId && !linkUrlError);
  const submitRequirementMessage = !selectedGoalId
    ? "목표를 추가하고 선택해야 노트를 등록할 수 있어요."
    : !selectedTodoId
      ? "선택한 목표의 할 일을 선택해야 노트를 등록할 수 있어요."
      : linkUrlError
        ? "참고 링크 형식을 확인해 주세요."
        : "";

  const handleDraft = () => {};

  const handleSubmit = () => {
    if (!canSubmit) return;
  };

  const handleGoalChange = (option: DropDownOption) => {
    const selectedTodo = todos.find((todo) => todo.id === selectedTodoId);

    setSelectedGoalId(option.id);
    if (selectedTodo?.goalId !== option.id) setSelectedTodoId("");
  };

  const handleTodoChange = (option: DropDownOption) => {
    const selectedTodo = todos.find((todo) => todo.id === option.id);
    if (selectedTodo?.goalId !== selectedGoalId) return;

    setSelectedTodoId(option.id);
  };

  const handleAddGoal = (label: string) => {
    const nextGoal = { id: `goal-${crypto.randomUUID()}`, label };
    setGoals((currentGoals) => [...currentGoals, nextGoal]);
    setSelectedGoalId(nextGoal.id);
    setSelectedTodoId("");
  };

  const handleAddTodo = (label: string) => {
    if (!selectedGoalId) return;

    const nextTodo = {
      id: `todo-${crypto.randomUUID()}`,
      label,
      goalId: selectedGoalId,
    };
    setTodos((currentTodos) => [...currentTodos, nextTodo]);
    setSelectedTodoId(nextTodo.id);
  };

  const handleLinkUrlBlur = () => {
    setLinkUrl((currentLinkUrl) => currentLinkUrl.trim());
    setIsLinkUrlTouched(true);
  };

  return (
    <div className="bg-surface text-foreground min-h-screen w-full min-w-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-50),var(--color-surface)_56%)]">
      <MobileNavigation />

      <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-100 md:px-32 md:pt-40 md:pb-40 xl:px-40">
        <NoteWriteHeader
          onBack={() => router.push(ROUTES.notes)}
          onDraft={handleDraft}
          onSubmit={handleSubmit}
          isSubmitDisabled={!canSubmit}
          statusMessage={submitRequirementMessage}
        />

        <div className="mb-16 hidden grid-cols-3 gap-20 xl:grid">
          <NoteActions
            onDraft={handleDraft}
            onSubmit={handleSubmit}
            isSubmitDisabled={!canSubmit}
            className="col-span-2 justify-end"
          />
        </div>

        <div className="grid min-w-0 gap-16 xl:grid-cols-3 xl:gap-20">
          <div className="min-w-0 xl:col-span-2">
            <NoteEditor
              title={title}
              content={content}
              onTitleChange={setTitle}
              onContentChange={(nextContent) => setContent(nextContent)}
            />
          </div>
          <NoteMetaPanel
            goals={goals}
            todos={todoOptions}
            selectedGoalId={selectedGoalId}
            selectedTodoId={selectedTodoId}
            linkUrl={linkUrl}
            linkUrlError={isLinkUrlTouched ? linkUrlError : ""}
            createdAt={formatCreatedAt(createdAt)}
            onGoalChange={handleGoalChange}
            onTodoChange={handleTodoChange}
            onAddGoal={handleAddGoal}
            onAddTodo={handleAddTodo}
            onLinkUrlChange={setLinkUrl}
            onLinkUrlBlur={handleLinkUrlBlur}
          />
        </div>

        <div className="mt-16 md:hidden">
          <NoteActions
            onDraft={handleDraft}
            onSubmit={handleSubmit}
            isSubmitDisabled={!canSubmit}
          />
        </div>
      </div>
    </div>
  );
}
