"use client";

import ConnectionSection from "./note-meta/ConnectionSection";
import CreatedAtSection from "./note-meta/CreatedAtSection";
import ReferenceLinkSection from "./note-meta/ReferenceLinkSection";
import type { DropDownOption } from "@/components/ui/Dropdown";

interface NoteMetaPanelProps {
  goals: DropDownOption[];
  todos: DropDownOption[];
  selectedGoalId: string;
  selectedTodoId: string;
  linkUrl: string;
  linkUrlError: string;
  createdAt: string;
  connectionDescription?: string;
  isGoalDisabled?: boolean;
  isTodoDisabled?: boolean;
  isLinkDisabled?: boolean;
  onGoalChange: (option: DropDownOption) => void;
  onTodoChange: (option: DropDownOption) => void;
  onAddGoal: (label: string) => void;
  onAddTodo: (label: string) => void;
  onLinkUrlChange: (value: string) => void;
  onLinkUrlBlur: () => void;
}

export default function NoteMetaPanel({
  goals,
  todos,
  selectedGoalId,
  selectedTodoId,
  linkUrl,
  linkUrlError,
  createdAt,
  connectionDescription = "이 노트는 다음 목표와 할 일에 속합니다.",
  isGoalDisabled = false,
  isTodoDisabled = false,
  isLinkDisabled = false,
  onGoalChange,
  onTodoChange,
  onAddGoal,
  onAddTodo,
  onLinkUrlChange,
  onLinkUrlBlur,
}: NoteMetaPanelProps) {
  return (
    <aside
      aria-label="노트 부가 정보"
      className="grid gap-16 lg:grid-cols-2 xl:grid-cols-1 xl:self-start"
    >
      <ConnectionSection
        goals={goals}
        todos={todos}
        selectedGoalId={selectedGoalId}
        selectedTodoId={selectedTodoId}
        description={connectionDescription}
        isGoalDisabled={isGoalDisabled}
        isTodoDisabled={isTodoDisabled}
        onGoalChange={onGoalChange}
        onTodoChange={onTodoChange}
        onAddGoal={onAddGoal}
        onAddTodo={onAddTodo}
      />
      <ReferenceLinkSection
        linkUrl={linkUrl}
        linkUrlError={linkUrlError}
        isDisabled={isLinkDisabled}
        onChange={onLinkUrlChange}
        onBlur={onLinkUrlBlur}
      />
      <CreatedAtSection createdAt={createdAt} />
    </aside>
  );
}
