"use client";

import MobileNavigation from "../components/MobileNavigation";
import { getNoteApiError, isNoteApiErrorStatus } from "../noteApiError";
import { createEmptyNoteContent, formatCreatedAt, getLinkUrlError, hasEmbeddedDataImage } from "../noteFormUtils";
import { uploadEmbeddedNoteImages } from "../noteImageUpload";
import DraftRestoreModal from "./components/DraftRestoreModal";
import NoteEditor from "./components/NoteEditor";
import NoteMetaPanel from "./components/NoteMetaPanel";
import NoteWriteHeader, { NoteActions } from "./components/NoteWriteHeader";
import { NOTE_DRAFT_VERSION, readNoteDraft, saveNoteDraft, type NoteDraft } from "./noteDraftStorage";
import type { DropDownOption } from "@/components/ui/Dropdown";
import ROUTES from "@/constants/routes";
import { useCreateNoteMutation } from "@/hooks/mutations/note/useNoteMutations";
import { useAddTodoMutation } from "@/hooks/mutations/todo/useTodoMutations";
import { useAllGoalQuery } from "@/hooks/queries/goal/useGoalQueries";
import { useAllTodoQuery } from "@/hooks/queries/todo/useTodoQueries";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import type { TodoResponse } from "@/types/todos.types";
import type { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type SubmitPhase = "idle" | "uploadingImages" | "creatingNote";

export default function NewNotePage() {
  const router = useRouter();
  const goalQuery = useAllGoalQuery();
  const todoQuery = useAllTodoQuery();
  const userQuery = useUserQuery();
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
  const [isActionError, setIsActionError] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>("idle");
  const [createdAt] = useState(() => new Date());
  const [draftToRestore, setDraftToRestore] = useState<NoteDraft | null>(null);
  const [isDraftRestoreOpen, setIsDraftRestoreOpen] = useState(false);
  const checkedDraftOwnerRef = useRef<string | null>(null);
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
  const connectionError = goalQuery.isError && !goalQuery.data ? goalQuery.error : todoQuery.error;
  const connectionErrorInfo = getNoteApiError(connectionError, "connectionList");
  const createErrorInfo = getNoteApiError(createNoteMutation.error, "create");
  const hasPendingImageUpload = hasEmbeddedDataImage(content);
  const isSubmitting = submitPhase !== "idle" || createNoteMutation.isPending;
  const canSubmit = Boolean(
    title.trim() &&
    effectiveGoalId &&
    effectiveTodoId &&
    !linkUrlError &&
    !hasPendingQueries &&
    !hasQueryError &&
    !isSubmitting,
  );
  const submitRequirementMessage = hasPendingQueries
    ? "목표와 할 일을 불러오는 중이에요."
    : hasQueryError
      ? connectionErrorInfo.message
      : submitPhase === "uploadingImages"
        ? "이미지를 업로드하는 중이에요."
        : submitPhase === "creatingNote" || createNoteMutation.isPending
          ? "노트를 등록하는 중이에요."
          : actionMessage
            ? actionMessage
            : createNoteMutation.isError
              ? createErrorInfo.message
              : !title.trim()
                ? "노트 제목을 입력해 주세요."
                : !effectiveGoalId
                  ? "목표를 추가하고 선택해야 노트를 등록할 수 있어요."
                  : !effectiveTodoId
                    ? "선택한 목표의 할 일을 선택해야 노트를 등록할 수 있어요."
                    : linkUrlError
                      ? "참고 링크 형식을 확인해 주세요."
                      : "";
  const hasStatusError = hasQueryError || isActionError || createNoteMutation.isError;

  useEffect(() => {
    const user = userQuery.data;
    if (!user) return;

    const ownerKey = `${user.teamId}:${user.id}`;
    if (checkedDraftOwnerRef.current === ownerKey) return;

    let isCancelled = false;
    queueMicrotask(() => {
      if (isCancelled || checkedDraftOwnerRef.current === ownerKey) return;
      checkedDraftOwnerRef.current = ownerKey;

      try {
        const draft = readNoteDraft({ teamId: user.teamId, userId: user.id });
        if (!draft) return;

        setDraftToRestore(draft);
        setIsDraftRestoreOpen(true);
      } catch {
        setActionMessage("임시저장한 노트를 확인하지 못했어요. 브라우저 저장 공간을 확인해 주세요.");
        setIsActionError(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [userQuery.data]);

  const clearActionState = () => {
    setActionMessage("");
    setIsActionError(false);
    createNoteMutation.reset();
  };

  const handleDraft = () => {
    clearActionState();

    const user = userQuery.data;
    if (!user) {
      setActionMessage(
        userQuery.isPending
          ? "사용자 정보를 확인하는 중이에요. 잠시 후 다시 시도해 주세요."
          : "사용자 정보를 확인하지 못해 임시저장할 수 없어요. 다시 로그인해 주세요.",
      );
      setIsActionError(true);
      return;
    }

    const goalId = Number(effectiveGoalId);
    const todoId = Number(effectiveTodoId);

    try {
      const isSaved = saveNoteDraft({
        version: NOTE_DRAFT_VERSION,
        teamId: user.teamId,
        userId: user.id,
        title,
        content,
        linkUrl,
        goalId: Number.isSafeInteger(goalId) && goalId > 0 ? goalId : null,
        todoId: Number.isSafeInteger(todoId) && todoId > 0 ? todoId : null,
        savedAt: new Date().toISOString(),
      });

      if (!isSaved) throw new Error("Local storage is unavailable");

      setActionMessage("작성 중인 노트를 임시저장했어요.");
      setIsActionError(false);
    } catch {
      setActionMessage("임시저장하지 못했어요. 브라우저 저장 공간을 확인한 뒤 다시 시도해 주세요.");
      setIsActionError(true);
    }
  };

  const handleSkipDraftRestore = () => {
    setIsDraftRestoreOpen(false);
  };

  const handleRestoreDraft = () => {
    setIsDraftRestoreOpen(false);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const todoId = Number(effectiveTodoId);
    if (!Number.isInteger(todoId)) return;

    clearActionState();
    setSubmitPhase(hasPendingImageUpload ? "uploadingImages" : "creatingNote");

    try {
      const imageUploadResult = await uploadEmbeddedNoteImages(content);
      setContent(imageUploadResult.content);

      if (imageUploadResult.failedCount > 0) {
        setActionMessage(
          `이미지 ${imageUploadResult.failedCount}개를 업로드하지 못했어요. 다시 등록하면 실패한 이미지만 재시도해요.`,
        );
        setIsActionError(true);
        return;
      }

      setSubmitPhase("creatingNote");
      await createNoteMutation.mutateAsync({
        todoId,
        title: title.trim(),
        content: imageUploadResult.content as Record<string, unknown>,
        ...(linkUrl.trim() ? { linkUrl: linkUrl.trim() } : {}),
      });
      router.push(ROUTES.notes);
    } catch (error) {
      if (isNoteApiErrorStatus(error, 404)) {
        setSelectedTodoId("");
        void todoQuery.refetch();
      }
    } finally {
      setSubmitPhase("idle");
    }
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
    createNoteMutation.reset();
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

      {draftToRestore && (
        <DraftRestoreModal
          isOpen={isDraftRestoreOpen}
          draftTitle={draftToRestore.title}
          savedAt={draftToRestore.savedAt}
          onSkip={handleSkipDraftRestore}
          onRestore={handleRestoreDraft}
        />
      )}

      <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-100 md:px-32 md:pt-40 md:pb-40 xl:px-40">
        <NoteWriteHeader
          onBack={() => router.push(ROUTES.notes)}
          onDraft={handleDraft}
          onSubmit={handleSubmit}
          isSubmitDisabled={!canSubmit}
          isSubmitting={isSubmitting}
          pendingLabel={submitPhase === "uploadingImages" ? "이미지 업로드 중..." : "등록 중..."}
          statusMessage={submitRequirementMessage}
          statusTone={hasStatusError ? "error" : "default"}
        />

        <div className="mb-16 hidden grid-cols-3 gap-20 xl:grid">
          <NoteActions
            onDraft={handleDraft}
            onSubmit={handleSubmit}
            isSubmitDisabled={!canSubmit}
            isSubmitting={isSubmitting}
            pendingLabel={submitPhase === "uploadingImages" ? "이미지 업로드 중..." : "등록 중..."}
            className="col-span-2 justify-end"
          />
        </div>

        <div className="grid min-w-0 gap-16 xl:grid-cols-3 xl:gap-20">
          <div className="min-w-0 xl:col-span-2">
            <NoteEditor
              title={title}
              content={content}
              isDisabled={isSubmitting}
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
            isGoalDisabled={isSubmitting || goalQuery.isPending || (goalQuery.isError && !goalQuery.data)}
            isTodoDisabled={
              isSubmitting || todoQuery.isPending || (todoQuery.isError && !todoQuery.data) || addTodoMutation.isPending
            }
            isLinkDisabled={isSubmitting}
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
            isSubmitting={isSubmitting}
            pendingLabel={submitPhase === "uploadingImages" ? "이미지 업로드 중..." : "등록 중..."}
          />
        </div>
      </div>
    </div>
  );
}
