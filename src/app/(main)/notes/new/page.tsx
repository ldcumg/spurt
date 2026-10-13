"use client";

import MobileNavigation from "../components/MobileNavigation";
import { createEmptyNoteContent, formatCreatedAt, getLinkUrlError, hasEmbeddedDataImage } from "../noteFormUtils";
import NoteEditor from "./components/NoteEditor";
import NoteMetaPanel from "./components/NoteMetaPanel";
import NoteWriteHeader, { NoteActions } from "./components/NoteWriteHeader";
import type { DropDownOption } from "@/components/ui/Dropdown";
import ROUTES from "@/constants/routes";
import { useCreateNoteMutation } from "@/hooks/mutations/note/useNoteMutations";
import { useAddTodoMutation } from "@/hooks/mutations/todo/useTodoMutations";
import { useAllGoalQuery } from "@/hooks/queries/goal/useGoalQueries";
import { useAllTodoQuery } from "@/hooks/queries/todo/useTodoQueries";
import type { TodoResponse } from "@/types/todos.types";
import type { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function NewNotePage() {
  const router = useRouter();
  const goalQuery = useAllGoalQuery();
  const todoQuery = useAllTodoQuery();
  const createNoteMutation = useCreateNoteMutation();
  const addTodoMutation = useAddTodoMutation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent>(() => createEmptyNoteContent());
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState("");
  const [createdTodos, setCreatedTodos] = useState<TodoResponse[]>([]);
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkUrlTouched, setIsLinkUrlTouched] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [createdAt] = useState(() => new Date());
  const goals = useMemo<DropDownOption[]>(
    () => goalQuery.data?.data.goals.map((goal) => ({ id: String(goal.id), label: goal.title })) ?? [],
    [goalQuery.data],
  );
  const effectiveGoalId = goals.some((goal) => goal.id === selectedGoalId) ? selectedGoalId : (goals[0]?.id ?? "");
  const todos = useMemo(() => {
    const fetchedTodos = todoQuery.data?.data.todos ?? [];
    const fetchedTodoIds = new Set(fetchedTodos.map((todo) => todo.id));

    return [...fetchedTodos, ...createdTodos.filter((todo) => !fetchedTodoIds.has(todo.id))];
  }, [createdTodos, todoQuery.data]);
  const todoOptions = useMemo<DropDownOption[]>(() => {
    const visibleTodos = todos.filter((todo) => String(todo.goalId) === effectiveGoalId);

    return visibleTodos.map((todo) => ({ id: String(todo.id), label: todo.title }));
  }, [effectiveGoalId, todos]);
  const effectiveTodoId = todoOptions.some((todo) => todo.id === selectedTodoId) ? selectedTodoId : "";
  const linkUrlError = getLinkUrlError(linkUrl);
  const hasPendingQueries = goalQuery.isPending || todoQuery.isPending;
  const hasQueryError = (goalQuery.isError && !goalQuery.data) || (todoQuery.isError && !todoQuery.data);
  const hasPendingImageUpload = hasEmbeddedDataImage(content);
  const canSubmit = Boolean(
    title.trim() &&
    effectiveGoalId &&
    effectiveTodoId &&
    !linkUrlError &&
    !hasPendingQueries &&
    !hasQueryError &&
    !hasPendingImageUpload &&
    !createNoteMutation.isPending,
  );
  const submitRequirementMessage = hasPendingQueries
    ? "목표와 할 일을 불러오는 중이에요."
    : hasQueryError
      ? "목표 또는 할 일을 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
      : actionMessage
        ? actionMessage
        : createNoteMutation.isError
          ? "노트를 등록하지 못했어요. 입력 내용을 확인한 뒤 다시 시도해 주세요."
          : !title.trim()
            ? "노트 제목을 입력해 주세요."
            : !effectiveGoalId
              ? "목표를 추가하고 선택해야 노트를 등록할 수 있어요."
              : !effectiveTodoId
                ? "선택한 목표의 할 일을 선택해야 노트를 등록할 수 있어요."
                : linkUrlError
                  ? "참고 링크 형식을 확인해 주세요."
                  : hasPendingImageUpload
                    ? "이미지는 업로드 API 연결 후 등록할 수 있어요. 현재 삽입한 이미지를 삭제해 주세요."
                    : createNoteMutation.isPending
                      ? "노트를 등록하는 중이에요."
                      : "";

  const handleDraft = () => {};

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const todoId = Number(effectiveTodoId);
    if (!Number.isInteger(todoId)) return;

    setActionMessage("");
    createNoteMutation.reset();

    try {
      await createNoteMutation.mutateAsync({
        todoId,
        title: title.trim(),
        content: content as Record<string, unknown>,
        ...(linkUrl.trim() ? { linkUrl: linkUrl.trim() } : {}),
      });
      router.push(ROUTES.notes);
    } catch {
      // mutation 상태를 통해 등록 실패 안내를 표시한다.
    }
  };

  const handleGoalChange = (option: DropDownOption) => {
    setSelectedGoalId(option.id);
    setSelectedTodoId("");
    setActionMessage("");
    createNoteMutation.reset();
  };

  const handleTodoChange = (option: DropDownOption) => {
    const selectedTodo = todos.find((todo) => String(todo.id) === option.id);
    if (String(selectedTodo?.goalId) !== effectiveGoalId) return;

    setSelectedTodoId(option.id);
    setActionMessage("");
    createNoteMutation.reset();
  };

  const handleAddGoal = (label: string) => {
    if (!label) return;
    setActionMessage("목표 추가 API가 아직 준비되지 않았어요. 연결된 목표를 선택해 주세요.");
  };

  const handleAddTodo = async (label: string) => {
    const goalId = Number(effectiveGoalId);
    if (!Number.isInteger(goalId)) return;

    setActionMessage("");
    try {
      const newTodo = await addTodoMutation.mutateAsync({ title: label, goalId });
      setCreatedTodos((currentTodos) => [...currentTodos.filter((todo) => todo.id !== newTodo.id), newTodo]);
      setSelectedTodoId(String(newTodo.id));
    } catch {
      setActionMessage("할 일을 추가하지 못했어요. 잠시 후 다시 시도해 주세요.");
    }
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
          isSubmitting={createNoteMutation.isPending}
          statusMessage={submitRequirementMessage}
        />

        <div className="mb-16 hidden grid-cols-3 gap-20 xl:grid">
          <NoteActions
            onDraft={handleDraft}
            onSubmit={handleSubmit}
            isSubmitDisabled={!canSubmit}
            isSubmitting={createNoteMutation.isPending}
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
            selectedGoalId={effectiveGoalId}
            selectedTodoId={effectiveTodoId}
            linkUrl={linkUrl}
            linkUrlError={isLinkUrlTouched ? linkUrlError : ""}
            createdAt={formatCreatedAt(createdAt)}
            isGoalDisabled={goalQuery.isPending || (goalQuery.isError && !goalQuery.data)}
            isTodoDisabled={todoQuery.isPending || (todoQuery.isError && !todoQuery.data) || addTodoMutation.isPending}
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
            isSubmitting={createNoteMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
