"use client";

import { getNoteApiError, isNoteApiErrorStatus } from "../../noteApiError";
import EditNoteForm from "./components/EditNoteForm";
import EditPageState from "./components/EditPageState";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { useNoteDetailQuery } from "@/hooks/queries/note/useNoteQueries";
import { useParams } from "next/navigation";

export default function EditNotePage() {
  const params = useParams<{ noteId: string }>();
  const noteId = Number(params.noteId);
  const isValidNoteId = Number.isInteger(noteId) && noteId > 0;
  const noteQuery = useNoteDetailQuery(isValidNoteId ? noteId : 0, isValidNoteId);
  const isNotFound = !isValidNoteId || (noteQuery.isError && isNoteApiErrorStatus(noteQuery.error, 404));
  const queryErrorInfo = getNoteApiError(noteQuery.error, "detail");

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
          title={queryErrorInfo.title}
          description={queryErrorInfo.message}
          onRetry={queryErrorInfo.canRetry ? () => void noteQuery.refetch() : undefined}
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
