"use client";

import MobileNavigation from "../components/MobileNavigation";
import NoteEditor from "./components/NoteEditor";
import NoteMetaPanel from "./components/NoteMetaPanel";
import NoteWriteHeader, { NoteActions } from "./components/NoteWriteHeader";
import { MOCK_NOTE_CONTEXT } from "./mock";
import type { DropDownOption } from "@/components/ui/Dropdown";
import ROUTES from "@/constants/routes";
import type { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EMPTY_NOTE_CONTENT: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
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
  const [todos, setTodos] = useState<DropDownOption[]>([...MOCK_NOTE_CONTEXT.todos]);
  const [selectedGoalId, setSelectedGoalId] = useState<string>(MOCK_NOTE_CONTEXT.selectedGoalId);
  const [selectedTodoId, setSelectedTodoId] = useState<string>(MOCK_NOTE_CONTEXT.selectedTodoId);
  const [createdAt] = useState(() => new Date());

  const handleDraft = () => {};

  const handleSubmit = () => {};

  const handleAddGoal = (label: string) => {
    const nextGoal = { id: `goal-${Date.now()}`, label };
    setGoals((currentGoals) => [...currentGoals, nextGoal]);
    setSelectedGoalId(nextGoal.id);
  };

  const handleAddTodo = (label: string) => {
    const nextTodo = { id: `todo-${Date.now()}`, label };
    setTodos((currentTodos) => [...currentTodos, nextTodo]);
    setSelectedTodoId(nextTodo.id);
  };

  return (
    <div className="bg-surface text-foreground min-h-screen w-full min-w-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-50),var(--color-surface)_56%)]">
      <MobileNavigation />

      <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-100 md:px-32 md:pt-40 md:pb-40 xl:px-40">
        <NoteWriteHeader
          onBack={() => router.push(ROUTES.notes)}
          onDraft={handleDraft}
          onSubmit={handleSubmit}
          statusMessage=""
        />

        <div className="mb-16 hidden grid-cols-3 gap-20 xl:grid">
          <NoteActions
            onDraft={handleDraft}
            onSubmit={handleSubmit}
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
            todos={todos}
            selectedGoalId={selectedGoalId}
            selectedTodoId={selectedTodoId}
            createdAt={formatCreatedAt(createdAt)}
            onGoalChange={(option) => setSelectedGoalId(option.id)}
            onTodoChange={(option) => setSelectedTodoId(option.id)}
            onAddGoal={handleAddGoal}
            onAddTodo={handleAddTodo}
          />
        </div>

        <div className="mt-16 md:hidden">
          <NoteActions
            onDraft={handleDraft}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
