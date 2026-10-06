"use client";

import { Calendar, FlagFilled, Link as LinkIcon, Todos, Under } from "@/assets/icons";
import Dropdown, { type DropDownOption } from "@/components/ui/Dropdown";
import type { ReactNode } from "react";

interface MetaSectionProps {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
}

function MetaSection({ icon, title, description, children }: MetaSectionProps) {
  return (
    <section className="border-border bg-surface-card rounded-xl border p-16 shadow-sm md:p-20">
      <header className="mb-16 flex items-start gap-12">
        <span className="bg-primary-50 text-primary-600 flex size-40 shrink-0 items-center justify-center rounded-full">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-title-xs text-foreground-title md:text-title-sm">{title}</h2>
          {description && <p className="text-body-sm md:text-body-md mt-2 text-neutral-500">{description}</p>}
        </div>
        <Under className="size-18 rotate-180 text-neutral-600 md:hidden" />
      </header>
      {children}
    </section>
  );
}

interface NoteMetaPanelProps {
  goals: DropDownOption[];
  todos: DropDownOption[];
  selectedGoalId: string;
  selectedTodoId: string;
  createdAt: string;
  onGoalChange: (option: DropDownOption) => void;
  onTodoChange: (option: DropDownOption) => void;
  onAddGoal: (label: string) => void;
  onAddTodo: (label: string) => void;
}

export default function NoteMetaPanel({
  goals,
  todos,
  selectedGoalId,
  selectedTodoId,
  createdAt,
  onGoalChange,
  onTodoChange,
  onAddGoal,
  onAddTodo,
}: NoteMetaPanelProps) {
  return (
    <aside
      aria-label="노트 부가 정보"
      className="grid gap-16 lg:grid-cols-2 xl:grid-cols-1 xl:self-start"
    >
      <MetaSection
        icon={<LinkIcon className="size-20" />}
        title="연결 정보"
        description="이 노트는 다음 목표와 할 일에 속합니다."
      >
        <div className="flex flex-col gap-8">
          <div className="bg-primary-50 rounded-lg p-12">
            <div className="mb-8 flex items-center gap-8">
              <FlagFilled className="text-warning size-20" />
              <strong className="text-title-xs">목표</strong>
            </div>
            <Dropdown
              options={goals}
              value={selectedGoalId}
              onChange={onGoalChange}
              onAddOption={onAddGoal}
            />
          </div>
          <div className="bg-blue-light rounded-lg p-12">
            <div className="mb-8 flex items-center gap-8">
              <Todos className="text-information size-20" />
              <strong className="text-title-xs">할 일</strong>
            </div>
            <Dropdown
              variant="todo"
              options={todos}
              value={selectedTodoId}
              onChange={onTodoChange}
              onAddOption={onAddTodo}
            />
          </div>
        </div>
      </MetaSection>

      <MetaSection
        icon={<Calendar className="size-20" />}
        title="작성일"
      >
        <time className="text-body-md block rounded-lg bg-neutral-50 px-16 py-12 text-neutral-600">{createdAt}</time>
      </MetaSection>
    </aside>
  );
}
