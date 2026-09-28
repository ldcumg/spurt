"use client";

import { MOCK_NOTE_CONTEXT } from "../mockData";
import { Calendar, FlagFilled, Link as LinkIcon, More, Right, Tag, Todos, Under } from "@/assets/icons";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { useState, type KeyboardEvent, type ReactNode } from "react";

interface MetaSectionProps {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

function MetaSection({ icon, title, description, children, className }: MetaSectionProps) {
  return (
    <section className={`border-border bg-surface-card rounded-xl border p-16 shadow-sm md:p-20 ${className ?? ""}`}>
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

function ConnectionItem({ type, title }: { type: "goal" | "todo"; title: string }) {
  const isGoal = type === "goal";

  return (
    <div className={`rounded-lg p-12 ${isGoal ? "bg-primary-50" : "bg-blue-light"}`}>
      <div className="mb-8 flex items-center gap-8">
        {isGoal ? <FlagFilled className="text-warning size-20" /> : <Todos className="text-information size-20" />}
        <strong className="text-title-xs">{isGoal ? "목표" : "할 일"}</strong>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="wide"
        className="text-body-md border-border flex items-center justify-between border bg-white px-12 text-left font-semibold text-neutral-800 shadow-sm"
      >
        <span className="truncate">{title}</span>
        <Right className="size-16 shrink-0" />
      </Button>
    </div>
  );
}

export default function NoteMetaPanel() {
  const [tags, setTags] = useState<string[]>([...MOCK_NOTE_CONTEXT.tags]);
  const [tagInput, setTagInput] = useState("");

  const handleTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    const nextTag = tagInput.trim().replace(/^#/, "");
    if (!nextTag || tags.includes(nextTag)) return;

    setTags((currentTags) => [...currentTags, nextTag]);
    setTagInput("");
  };

  return (
    <aside
      aria-label="노트 부가 정보"
      className="grid gap-16 lg:grid-cols-2 xl:grid-cols-1"
    >
      <MetaSection
        icon={<LinkIcon className="size-20" />}
        title="연결 정보"
        description="이 노트는 다음 목표와 할 일에 속합니다."
        className="lg:row-span-2 xl:row-auto"
      >
        <div className="flex flex-col gap-8">
          <ConnectionItem
            type="goal"
            title={MOCK_NOTE_CONTEXT.goal}
          />
          <ConnectionItem
            type="todo"
            title={MOCK_NOTE_CONTEXT.todo}
          />
        </div>
      </MetaSection>

      <MetaSection
        icon={<Tag className="size-20" />}
        title="태그"
        description="태그를 추가해 노트를 더 잘 관리해보세요."
      >
        <TextInput
          aria-label="태그 입력"
          value={tagInput}
          placeholder="# 태그를 입력하고 Enter"
          onChange={(event) => setTagInput(event.target.value)}
          onKeyDown={handleTagKeyDown}
        />
        <div className="mt-12 flex flex-wrap gap-8">
          {tags.map((tag) => (
            <Button
              key={tag}
              type="button"
              variant="ghost"
              size="xs"
              title="클릭해서 태그 삭제"
              className="bg-blue-light text-information"
              onClick={() => setTags((currentTags) => currentTags.filter((item) => item !== tag))}
            >
              #{tag}
            </Button>
          ))}
          <span className="bg-blue-light text-caption text-information flex h-20 items-center rounded-sm px-8">
            <More className="size-14" />
          </span>
        </div>
      </MetaSection>

      <MetaSection
        icon={<Calendar className="size-20" />}
        title="작성일"
      >
        <time className="text-body-md block rounded-lg bg-neutral-50 px-16 py-12 text-neutral-600">
          {MOCK_NOTE_CONTEXT.createdAt}
        </time>
      </MetaSection>
    </aside>
  );
}
