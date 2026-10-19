"use client";

import { getNoteApiError, isNoteApiErrorStatus } from "../../noteApiError";
import { hasEmbeddedDataImage } from "../../noteFormUtils";
import { uploadEmbeddedNoteImages } from "../../noteImageUpload";
import ROUTES from "@/constants/routes";
import { useCreateNoteMutation } from "@/hooks/mutations/note/useNoteMutations";
import type { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SubmitPhase = "idle" | "uploadingImages" | "creatingNote";

interface UseCreateNoteParams {
  onContentChange: (content: JSONContent) => void;
  onTodoNotFound: () => void;
  onSuccess: () => void;
}

interface SubmitNoteParams {
  title: string;
  content: JSONContent;
  linkUrl: string;
  todoId: string;
}

interface CreateStatusMessageParams {
  submitPhase: SubmitPhase;
  isCreatePending: boolean;
  imageUploadError: string;
  hasCreateError: boolean;
  createErrorMessage: string;
}

const getCreateStatusMessage = ({
  submitPhase,
  isCreatePending,
  imageUploadError,
  hasCreateError,
  createErrorMessage,
}: CreateStatusMessageParams) => {
  if (submitPhase === "uploadingImages") return "이미지를 업로드하는 중이에요.";
  if (submitPhase === "creatingNote" || isCreatePending) return "노트를 등록하는 중이에요.";
  if (imageUploadError) return imageUploadError;
  if (hasCreateError) return createErrorMessage;

  return "";
};

export const useCreateNote = ({ onContentChange, onTodoNotFound, onSuccess }: UseCreateNoteParams) => {
  const router = useRouter();
  const createNoteMutation = useCreateNoteMutation();
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>("idle");
  const [imageUploadError, setImageUploadError] = useState("");

  const isSubmitting = submitPhase !== "idle" || createNoteMutation.isPending;
  const createErrorInfo = getNoteApiError(createNoteMutation.error, "create");
  const statusMessage = getCreateStatusMessage({
    submitPhase,
    isCreatePending: createNoteMutation.isPending,
    imageUploadError,
    hasCreateError: createNoteMutation.isError,
    createErrorMessage: createErrorInfo.message,
  });
  const isError = Boolean(imageUploadError) || createNoteMutation.isError;
  const pendingLabel = submitPhase === "uploadingImages" ? "이미지 업로드 중..." : "등록 중...";

  const reset = () => {
    setSubmitPhase("idle");
    setImageUploadError("");
    createNoteMutation.reset();
  };

  const submitNote = async ({ title, content, linkUrl, todoId }: SubmitNoteParams) => {
    const numericTodoId = Number(todoId);
    if (!Number.isInteger(numericTodoId)) return;

    reset();
    setSubmitPhase(hasEmbeddedDataImage(content) ? "uploadingImages" : "creatingNote");

    try {
      const imageUploadResult = await uploadEmbeddedNoteImages(content);
      onContentChange(imageUploadResult.content);

      if (imageUploadResult.failedCount > 0) {
        setImageUploadError(
          `이미지 ${imageUploadResult.failedCount}개를 업로드하지 못했어요. 다시 등록하면 실패한 이미지만 재시도해요.`,
        );
        return;
      }

      setSubmitPhase("creatingNote");
      await createNoteMutation.mutateAsync({
        todoId: numericTodoId,
        title: title.trim(),
        content: imageUploadResult.content as Record<string, unknown>,
        ...(linkUrl.trim() ? { linkUrl: linkUrl.trim() } : {}),
      });

      onSuccess();
      router.push(ROUTES.notes);
    } catch (error) {
      if (isNoteApiErrorStatus(error, 404)) onTodoNotFound();
    } finally {
      setSubmitPhase("idle");
    }
  };

  return {
    isSubmitting,
    isError,
    statusMessage,
    pendingLabel,
    reset,
    submitNote,
  };
};
