"use client";

import NoteEditor from "../../../new/components/NoteEditor";
import NoteMetaPanel from "../../../new/components/NoteMetaPanel";
import NoteWriteHeader, { NoteActions } from "../../../new/components/NoteWriteHeader";
import { getNoteApiError, isNoteApiErrorStatus } from "../../../noteApiError";
import { createEmptyNoteContent, formatCreatedAt, getLinkUrlError, hasEmbeddedDataImage } from "../../../noteFormUtils";
import { uploadEmbeddedNoteImages } from "../../../noteImageUpload";
import { getNoteTodoGoalLabel, useNoteTodoGoals } from "../../../useNoteTodoGoals";
import EditPageState from "./EditPageState";
import NOTE_QUERY_KEYS from "@/constants/queryKeys/note";
import ROUTES from "@/constants/routes";
import { useUpdateNoteMutation } from "@/hooks/mutations/note/useNoteMutations";
import type { NoteResponse } from "@/types/notes.types";
import { useQueryClient } from "@tanstack/react-query";
import type { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface EditNoteFormProps {
  note: NoteResponse;
}

type SubmitPhase = "idle" | "uploadingImages" | "updatingNote";

const ignoreImmutableConnectionChange = () => undefined;

/** 기존 노트의 수정 가능한 필드와 수정 요청 흐름을 관리한다. */
export default function EditNoteForm({ note }: EditNoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const updateNoteMutation = useUpdateNoteMutation();
  const initialContent = note.content ? (note.content as JSONContent) : createEmptyNoteContent();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState<JSONContent>(initialContent);
  const [linkUrl, setLinkUrl] = useState(note.linkUrl ?? "");
  const [isLinkUrlTouched, setIsLinkUrlTouched] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>("idle");
  const todoGoalStateById = useNoteTodoGoals([note.todoId]);
  const todoGoalState = todoGoalStateById.get(note.todoId);
  const goalLabel = getNoteTodoGoalLabel(todoGoalState);
  const resolvedGoal = todoGoalState?.status === "success" ? todoGoalState.goal : null;
  const goalOptions = [
    resolvedGoal
      ? { id: String(resolvedGoal.id), label: resolvedGoal.title }
      : { id: `todo-${note.todoId}-goal-status`, label: goalLabel },
  ];
  const todoOptions = useMemo(() => [{ id: String(note.todo.id), label: note.todo.title }], [note.todo]);
  const linkUrlError = getLinkUrlError(linkUrl);
  const hasPendingImageUpload = hasEmbeddedDataImage(content);
  const updateErrorInfo = getNoteApiError(updateNoteMutation.error, "update");
  const isSubmitting = submitPhase !== "idle" || updateNoteMutation.isPending;
  const canSubmit = Boolean(title.trim() && !linkUrlError && !isSubmitting);
  const statusMessage =
    submitPhase === "uploadingImages"
      ? "이미지를 업로드하는 중이에요."
      : submitPhase === "updatingNote" || updateNoteMutation.isPending
        ? "노트를 수정하는 중이에요."
        : imageUploadError
          ? imageUploadError
          : updateNoteMutation.isError
            ? updateErrorInfo.message
            : !title.trim()
              ? "노트 제목을 입력해 주세요."
              : linkUrlError
                ? "참고 링크 형식을 확인해 주세요."
                : "";

  const handleSubmit = async () => {
    if (!canSubmit) return;

    updateNoteMutation.reset();
    setImageUploadError("");
    setSubmitPhase(hasPendingImageUpload ? "uploadingImages" : "updatingNote");
    try {
      const imageUploadResult = await uploadEmbeddedNoteImages(content);
      setContent(imageUploadResult.content);

      if (imageUploadResult.failedCount > 0) {
        setImageUploadError(
          `이미지 ${imageUploadResult.failedCount}개를 업로드하지 못했어요. 다시 수정하면 실패한 이미지만 재시도해요.`,
        );
        return;
      }

      setSubmitPhase("updatingNote");
      await updateNoteMutation.mutateAsync({
        noteId: note.id,
        body: {
          title: title.trim(),
          content: imageUploadResult.content as Record<string, unknown>,
          linkUrl: linkUrl.trim() || null,
        },
      });
      router.push(ROUTES.notes);
    } catch (error) {
      if (isNoteApiErrorStatus(error, 404)) {
        queryClient.removeQueries({ queryKey: NOTE_QUERY_KEYS.detail(note.id), exact: true });
        void queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.lists() });
      }
    } finally {
      setSubmitPhase("idle");
    }
  };

  const handleLinkUrlBlur = () => {
    setLinkUrl((currentLinkUrl) => currentLinkUrl.trim());
    setIsLinkUrlTouched(true);
  };

  const clearMutationError = () => {
    setImageUploadError("");
    if (updateNoteMutation.isError) updateNoteMutation.reset();
  };

  if (updateNoteMutation.isError && isNoteApiErrorStatus(updateNoteMutation.error, 404)) {
    return (
      <EditPageState
        title={updateErrorInfo.title}
        description={updateErrorInfo.message}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-100 md:px-32 md:pt-40 md:pb-40 xl:px-40">
      <NoteWriteHeader
        onBack={() => router.push(ROUTES.notes)}
        onSubmit={handleSubmit}
        isSubmitDisabled={!canSubmit}
        isSubmitting={isSubmitting}
        submitLabel="수정하기"
        pendingLabel={submitPhase === "uploadingImages" ? "이미지 업로드 중..." : "수정 중..."}
        heading="노트 수정하기"
        description="기록한 내용을 더 정확하게 다듬어보세요."
        statusMessage={statusMessage}
        statusTone={imageUploadError || updateNoteMutation.isError ? "error" : "default"}
      />

      <div className="mb-16 hidden grid-cols-3 gap-20 xl:grid">
        <NoteActions
          onSubmit={handleSubmit}
          isSubmitDisabled={!canSubmit}
          isSubmitting={isSubmitting}
          submitLabel="수정하기"
          pendingLabel={submitPhase === "uploadingImages" ? "이미지 업로드 중..." : "수정 중..."}
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
              clearMutationError();
            }}
            onContentChange={(nextContent) => {
              setContent(nextContent);
              clearMutationError();
            }}
          />
        </div>
        <NoteMetaPanel
          goals={goalOptions}
          todos={todoOptions}
          selectedGoalId={goalOptions[0]?.id ?? ""}
          selectedTodoId={todoOptions[0].id}
          linkUrl={linkUrl}
          linkUrlError={isLinkUrlTouched ? linkUrlError : ""}
          createdAt={formatCreatedAt(note.createdAt)}
          connectionDescription={
            todoGoalState?.status === "error"
              ? "목표 정보를 불러오지 못했지만 노트 내용은 수정할 수 있습니다."
              : "목표와 할 일은 노트 수정에서 변경할 수 없습니다."
          }
          isGoalDisabled
          isTodoDisabled
          isLinkDisabled={isSubmitting}
          onGoalChange={ignoreImmutableConnectionChange}
          onTodoChange={ignoreImmutableConnectionChange}
          onAddGoal={ignoreImmutableConnectionChange}
          onAddTodo={ignoreImmutableConnectionChange}
          onLinkUrlChange={(nextLinkUrl) => {
            setLinkUrl(nextLinkUrl);
            clearMutationError();
          }}
          onLinkUrlBlur={handleLinkUrlBlur}
        />
      </div>

      <div className="mt-16 md:hidden">
        <NoteActions
          onSubmit={handleSubmit}
          isSubmitDisabled={!canSubmit}
          isSubmitting={isSubmitting}
          submitLabel="수정하기"
          pendingLabel={submitPhase === "uploadingImages" ? "이미지 업로드 중..." : "수정 중..."}
        />
      </div>
    </div>
  );
}
