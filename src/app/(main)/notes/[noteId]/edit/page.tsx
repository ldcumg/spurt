"use client";

import MobileNavigation from "../../components/MobileNavigation";
import NoteEditor from "../../new/components/NoteEditor";
import NoteMetaPanel from "../../new/components/NoteMetaPanel";
import NoteWriteHeader, { NoteActions } from "../../new/components/NoteWriteHeader";
import { createEmptyNoteContent, formatCreatedAt, getLinkUrlError, hasEmbeddedDataImage } from "../../noteFormUtils";
import { Left, NoteFilled } from "@/assets/icons";
import Button from "@/components/ui/Button";
import ROUTES from "@/constants/routes";
import { useUpdateNoteMutation } from "@/hooks/mutations/note/useNoteMutations";
import { useNoteDetailQuery } from "@/hooks/queries/note/useNoteQueries";
import type { NoteResponse } from "@/types/notes.types";
import type { JSONContent } from "@tiptap/react";
import { isAxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface EditNoteFormProps {
  note: NoteResponse;
}

const ignoreImmutableConnectionChange = () => undefined;

function EditNoteForm({ note }: EditNoteFormProps) {
  const router = useRouter();
  const updateNoteMutation = useUpdateNoteMutation();
  const initialContent = note.content ? (note.content as JSONContent) : createEmptyNoteContent();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState<JSONContent>(initialContent);
  const [linkUrl, setLinkUrl] = useState(note.linkUrl ?? "");
  const [isLinkUrlTouched, setIsLinkUrlTouched] = useState(false);
  const goalOptions = useMemo(
    () => (note.todo.goal ? [{ id: String(note.todo.goal.id), label: note.todo.goal.title }] : []),
    [note.todo.goal],
  );
  const todoOptions = useMemo(() => [{ id: String(note.todo.id), label: note.todo.title }], [note.todo]);
  const linkUrlError = getLinkUrlError(linkUrl);
  const hasPendingImageUpload = hasEmbeddedDataImage(content);
  const canSubmit = Boolean(title.trim() && !linkUrlError && !hasPendingImageUpload && !updateNoteMutation.isPending);
  const statusMessage = updateNoteMutation.isError
    ? "노트를 수정하지 못했어요. 입력 내용을 확인한 뒤 다시 시도해 주세요."
    : !title.trim()
      ? "노트 제목을 입력해 주세요."
      : linkUrlError
        ? "참고 링크 형식을 확인해 주세요."
        : hasPendingImageUpload
          ? "이미지는 업로드 API 연결 후 저장할 수 있어요. 현재 삽입한 이미지를 삭제해 주세요."
          : updateNoteMutation.isPending
            ? "노트를 수정하는 중이에요."
            : "";

  const handleSubmit = async () => {
    if (!canSubmit) return;

    updateNoteMutation.reset();
    try {
      await updateNoteMutation.mutateAsync({
        noteId: note.id,
        body: {
          title: title.trim(),
          content: content as Record<string, unknown>,
          linkUrl: linkUrl.trim() || null,
        },
      });
      router.push(ROUTES.notes);
    } catch {
      // mutation 상태를 통해 수정 실패 안내를 표시한다.
    }
  };

  const handleLinkUrlBlur = () => {
    setLinkUrl((currentLinkUrl) => currentLinkUrl.trim());
    setIsLinkUrlTouched(true);
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-100 md:px-32 md:pt-40 md:pb-40 xl:px-40">
      <NoteWriteHeader
        onBack={() => router.push(ROUTES.notes)}
        onSubmit={handleSubmit}
        isSubmitDisabled={!canSubmit}
        isSubmitting={updateNoteMutation.isPending}
        submitLabel="수정하기"
        pendingLabel="수정 중..."
        heading="노트 수정하기"
        description="기록한 내용을 더 정확하게 다듬어보세요."
        statusMessage={statusMessage}
      />

      <div className="mb-16 hidden grid-cols-3 gap-20 xl:grid">
        <NoteActions
          onSubmit={handleSubmit}
          isSubmitDisabled={!canSubmit}
          isSubmitting={updateNoteMutation.isPending}
          submitLabel="수정하기"
          pendingLabel="수정 중..."
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
          goals={goalOptions}
          todos={todoOptions}
          selectedGoalId={goalOptions[0]?.id ?? ""}
          selectedTodoId={todoOptions[0].id}
          linkUrl={linkUrl}
          linkUrlError={isLinkUrlTouched ? linkUrlError : ""}
          createdAt={formatCreatedAt(note.createdAt)}
          connectionDescription="목표와 할 일은 노트 수정에서 변경할 수 없습니다."
          isGoalDisabled
          isTodoDisabled
          onGoalChange={ignoreImmutableConnectionChange}
          onTodoChange={ignoreImmutableConnectionChange}
          onAddGoal={ignoreImmutableConnectionChange}
          onAddTodo={ignoreImmutableConnectionChange}
          onLinkUrlChange={setLinkUrl}
          onLinkUrlBlur={handleLinkUrlBlur}
        />
      </div>

      <div className="mt-16 md:hidden">
        <NoteActions
          onSubmit={handleSubmit}
          isSubmitDisabled={!canSubmit}
          isSubmitting={updateNoteMutation.isPending}
          submitLabel="수정하기"
          pendingLabel="수정 중..."
        />
      </div>
    </div>
  );
}

interface EditPageStateProps {
  title: string;
  description: string;
  isLoading?: boolean;
  onRetry?: () => void;
}

function EditPageState({ title, description, isLoading = false, onRetry }: EditPageStateProps) {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-100 md:px-32 md:pt-40 md:pb-40 xl:px-40">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-body-md mb-16 inline-flex items-center gap-4 px-4 text-neutral-600"
        onClick={() => router.push(ROUTES.notes)}
      >
        <Left className="size-18" />
        노트로 돌아가기
      </Button>
      <section className="border-border bg-surface-card flex min-h-320 flex-col items-center justify-center rounded-xl border px-24 text-center shadow-sm">
        <NoteFilled className="mb-12 size-44 text-neutral-400" />
        <h1 className="text-title-md text-foreground-title">{title}</h1>
        <p className="text-body-md mt-8 text-neutral-600">{description}</p>
        {onRetry && !isLoading && (
          <Button
            type="button"
            variant="outline"
            size="md"
            className="mt-16"
            onClick={onRetry}
          >
            다시 시도
          </Button>
        )}
      </section>
    </div>
  );
}

export default function EditNotePage() {
  const params = useParams<{ noteId: string }>();
  const noteId = Number(params.noteId);
  const isValidNoteId = Number.isInteger(noteId) && noteId > 0;
  const noteQuery = useNoteDetailQuery(isValidNoteId ? noteId : 0, isValidNoteId);
  const isNotFound =
    !isValidNoteId || (noteQuery.isError && isAxiosError(noteQuery.error) && noteQuery.error.response?.status === 404);

  return (
    <div className="bg-surface text-foreground min-h-screen w-full min-w-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-50),var(--color-surface)_56%)]">
      <MobileNavigation />

      {isNotFound ? (
        <EditPageState
          title="노트를 찾을 수 없어요"
          description="삭제되었거나 존재하지 않는 노트예요."
        />
      ) : noteQuery.isPending || (noteQuery.isError && noteQuery.isFetching) ? (
        <EditPageState
          title="노트를 불러오는 중이에요"
          description="수정할 내용을 준비하고 있어요."
          isLoading
        />
      ) : noteQuery.isError || !noteQuery.data ? (
        <EditPageState
          title="노트를 불러오지 못했어요"
          description="잠시 후 다시 시도해 주세요."
          onRetry={() => void noteQuery.refetch()}
        />
      ) : (
        <EditNoteForm
          key={noteQuery.data.id}
          note={noteQuery.data}
        />
      )}
    </div>
  );
}
