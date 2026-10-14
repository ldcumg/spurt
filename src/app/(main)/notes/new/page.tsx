"use client";

import MobileNavigation from "../components/MobileNavigation";
import { getNoteApiError, isNoteApiErrorStatus } from "../noteApiError";
import { createEmptyNoteContent, formatCreatedAt, getLinkUrlError } from "../noteFormUtils";
import DraftRestoreModal from "./components/DraftRestoreModal";
import NoteEditor from "./components/NoteEditor";
import NoteMetaPanel from "./components/NoteMetaPanel";
import NoteWriteHeader, { NoteActions } from "./components/NoteWriteHeader";
import { useCreateNote } from "./hooks/useCreateNote";
import { useNoteDraft } from "./hooks/useNoteDraft";
import type { DropDownOption } from "@/components/ui/Dropdown";
import ROUTES from "@/constants/routes";
import { useAddTodoMutation } from "@/hooks/mutations/todo/useTodoMutations";
import { useAllGoalQuery } from "@/hooks/queries/goal/useGoalQueries";
import { useAllTodoQuery } from "@/hooks/queries/todo/useTodoQueries";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import type { TodoResponse } from "@/types/todos.types";
import type { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface SubmitRequirementMessageParams {
  hasPendingQueries: boolean;
  hasQueryError: boolean;
  connectionErrorMessage: string;
  isSubmitting: boolean;
  submitStatusMessage: string;
  actionMessage: string;
  hasSubmitError: boolean;
  title: string;
  goalId: string;
  todoId: string;
  linkUrlError: string;
}

const getSubmitRequirementMessage = ({
  hasPendingQueries,
  hasQueryError,
  connectionErrorMessage,
  isSubmitting,
  submitStatusMessage,
  actionMessage,
  hasSubmitError,
  title,
  goalId,
  todoId,
  linkUrlError,
}: SubmitRequirementMessageParams) => {
  if (hasPendingQueries) return "목표와 할 일을 불러오는 중이에요.";
  if (hasQueryError) return connectionErrorMessage;
  if (isSubmitting) return submitStatusMessage;
  if (actionMessage) return actionMessage;
  if (hasSubmitError) return submitStatusMessage;
  if (!title.trim()) return "노트 제목을 입력해 주세요.";
  if (!goalId) return "목표를 추가하고 선택해야 노트를 등록할 수 있어요.";
  if (!todoId) return "선택한 목표의 할 일을 선택해야 노트를 등록할 수 있어요.";
  if (linkUrlError) return "참고 링크 형식을 확인해 주세요.";

  return "";
};

export default function NewNotePage() {
  const router = useRouter();
  const goalQuery = useAllGoalQuery();
  const todoQuery = useAllTodoQuery();
  const userQuery = useUserQuery();
  const addTodoMutation = useAddTodoMutation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent>(() => createEmptyNoteContent());
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState("");
  const [createdTodos, setCreatedTodos] = useState<TodoResponse[]>([]);
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkUrlTouched, setIsLinkUrlTouched] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [isActionError, setIsActionError] = useState(false);
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
  const noteDraft = useNoteDraft({
    user: userQuery.data,
    isUserPending: userQuery.isPending,
    goals,
    todos,
  });
  const createNote = useCreateNote({
    onContentChange: setContent,
    onTodoNotFound: () => {
      setSelectedTodoId("");
      void todoQuery.refetch();
    },
    onSuccess: noteDraft.removeDraft,
  });
  const visibleActionMessage = actionMessage || noteDraft.statusMessage;
  const isVisibleActionError = actionMessage ? isActionError : noteDraft.isStatusError;
  const linkUrlError = getLinkUrlError(linkUrl);
  const hasPendingQueries = goalQuery.isPending || todoQuery.isPending;
  const hasQueryError = (goalQuery.isError && !goalQuery.data) || (todoQuery.isError && !todoQuery.data);
  const connectionError = goalQuery.isError && !goalQuery.data ? goalQuery.error : todoQuery.error;
  const connectionErrorInfo = getNoteApiError(connectionError, "connectionList");
  const canSubmit = Boolean(
    title.trim() &&
    effectiveGoalId &&
    effectiveTodoId &&
    !linkUrlError &&
    !hasPendingQueries &&
    !hasQueryError &&
    !createNote.isSubmitting,
  );
  const submitRequirementMessage = getSubmitRequirementMessage({
    hasPendingQueries,
    hasQueryError,
    connectionErrorMessage: connectionErrorInfo.message,
    isSubmitting: createNote.isSubmitting,
    submitStatusMessage: createNote.statusMessage,
    actionMessage: visibleActionMessage,
    hasSubmitError: createNote.isError,
    title,
    goalId: effectiveGoalId,
    todoId: effectiveTodoId,
    linkUrlError,
  });
  const hasStatusError = hasQueryError || isVisibleActionError || createNote.isError;

  const clearActionState = () => {
    setActionMessage("");
    setIsActionError(false);
    noteDraft.clearStatus();
    createNote.reset();
  };

  const handleDraft = () => {
    clearActionState();
    noteDraft.saveDraft({ title, content, linkUrl, goalId: effectiveGoalId, todoId: effectiveTodoId });
  };

  const handleRestoreDraft = () => {
    clearActionState();
    const restoredDraft = noteDraft.restoreDraft();
    if (!restoredDraft) return;

    setTitle(restoredDraft.title);
    setContent(restoredDraft.content);
    setLinkUrl(restoredDraft.linkUrl);
    setIsLinkUrlTouched(false);
    setSelectedGoalId(restoredDraft.goalId);
    setSelectedTodoId(restoredDraft.todoId);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    clearActionState();
    await createNote.submitNote({ title, content, linkUrl, todoId: effectiveTodoId });
  };

  const handleGoalChange = (option: DropDownOption) => {
    setSelectedGoalId(option.id);
    setSelectedTodoId("");
    clearActionState();
  };

  const handleTodoChange = (option: DropDownOption) => {
    const selectedTodo = todos.find((todo) => String(todo.id) === option.id);
    if (String(selectedTodo?.goalId) !== effectiveGoalId) return;

    setSelectedTodoId(option.id);
    clearActionState();
  };

  const handleAddGoal = (label: string) => {
    if (!label) return;
    createNote.reset();
    setActionMessage("목표 추가 API가 아직 준비되지 않았어요. 연결된 목표를 선택해 주세요.");
    setIsActionError(false);
  };

  const handleAddTodo = async (label: string) => {
    const goalId = Number(effectiveGoalId);
    if (!Number.isInteger(goalId)) return;

    clearActionState();
    try {
      const newTodo = await addTodoMutation.mutateAsync({ title: label, goalId });
      setCreatedTodos((currentTodos) => [...currentTodos.filter((todo) => todo.id !== newTodo.id), newTodo]);
      setSelectedTodoId(String(newTodo.id));
    } catch (error) {
      if (isNoteApiErrorStatus(error, 404)) {
        setSelectedGoalId("");
        setSelectedTodoId("");
        void goalQuery.refetch();
      }
      setActionMessage(getNoteApiError(error, "todoCreate").message);
      setIsActionError(true);
    }
  };

  const handleLinkUrlBlur = () => {
    setLinkUrl((currentLinkUrl) => currentLinkUrl.trim());
    setIsLinkUrlTouched(true);
  };

  return (
    <div className="bg-surface text-foreground min-h-screen w-full min-w-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-50),var(--color-surface)_56%)]">
      <MobileNavigation />

      {noteDraft.draftToRestore && (
        <DraftRestoreModal
          isOpen={noteDraft.isRestoreOpen}
          draftTitle={noteDraft.draftToRestore.title}
          savedAt={noteDraft.draftToRestore.savedAt}
          isRestoreDisabled={hasPendingQueries}
          onSkip={noteDraft.skipRestore}
          onRestore={handleRestoreDraft}
        />
      )}

      <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-100 md:px-32 md:pt-40 md:pb-40 xl:px-40">
        <NoteWriteHeader
          onBack={() => router.push(ROUTES.notes)}
          onDraft={handleDraft}
          onSubmit={handleSubmit}
          isSubmitDisabled={!canSubmit}
          isSubmitting={createNote.isSubmitting}
          pendingLabel={createNote.pendingLabel}
          statusMessage={submitRequirementMessage}
          statusTone={hasStatusError ? "error" : "default"}
        />

        <div className="mb-16 hidden grid-cols-3 gap-20 xl:grid">
          <NoteActions
            onDraft={handleDraft}
            onSubmit={handleSubmit}
            isSubmitDisabled={!canSubmit}
            isSubmitting={createNote.isSubmitting}
            pendingLabel={createNote.pendingLabel}
            className="col-span-2 justify-end"
          />
        </div>

        <div className="grid min-w-0 gap-16 xl:grid-cols-3 xl:gap-20">
          <div className="min-w-0 xl:col-span-2">
            <NoteEditor
              title={title}
              content={content}
              isDisabled={createNote.isSubmitting}
              onTitleChange={(nextTitle) => {
                setTitle(nextTitle);
                clearActionState();
              }}
              onContentChange={(nextContent) => {
                setContent(nextContent);
                clearActionState();
              }}
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
            isGoalDisabled={createNote.isSubmitting || goalQuery.isPending || (goalQuery.isError && !goalQuery.data)}
            isTodoDisabled={
              createNote.isSubmitting ||
              todoQuery.isPending ||
              (todoQuery.isError && !todoQuery.data) ||
              addTodoMutation.isPending
            }
            isLinkDisabled={createNote.isSubmitting}
            onGoalChange={handleGoalChange}
            onTodoChange={handleTodoChange}
            onAddGoal={handleAddGoal}
            onAddTodo={handleAddTodo}
            onLinkUrlChange={(nextLinkUrl) => {
              setLinkUrl(nextLinkUrl);
              clearActionState();
            }}
            onLinkUrlBlur={handleLinkUrlBlur}
          />
        </div>

        <div className="mt-16 md:hidden">
          <NoteActions
            onDraft={handleDraft}
            onSubmit={handleSubmit}
            isSubmitDisabled={!canSubmit}
            isSubmitting={createNote.isSubmitting}
            pendingLabel={createNote.pendingLabel}
          />
        </div>
      </div>
    </div>
  );
}
