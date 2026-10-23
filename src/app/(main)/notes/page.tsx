"use client";

import Button from "@/components/ui/Button";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";
import NoteDeleteDialog from "./components/NoteDeleteDialog";
import NoteDetailPanel from "./components/NoteDetailPanel";
import NotesHero from "./components/NotesHero";
import NotesList from "./components/NotesList";
import NotesToolbar from "./components/NotesToolbar";
import { useNoteDelete } from "./hooks/useNoteDelete";
import { useNoteDetail } from "./hooks/useNoteDetail";
import { useNotesList } from "./hooks/useNotesList";

export default function NotePage() {
  const router = useRouter();
  const noteList = useNotesList();
  const noteDetail = useNoteDetail();
  const noteDelete = useNoteDelete({ onDeleted: noteDetail.handleDeleted });

  const handleNewNote = () => {
    router.push(ROUTES.newNote);
  };

  const handleEditNote = () => {
    if (!noteDetail.note) return;

    router.push(ROUTES.editNote(noteDetail.note.id));
  };

  return (
    <div className="bg-surface text-foreground min-h-screen w-full">
      <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-112 md:px-32 md:pt-40 md:pb-40 xl:px-40">
        <NotesHero
          searchTerm={noteList.searchTerm}
          onSearchChange={noteList.setSearchTerm}
          onNewNote={handleNewNote}
        />
        <NotesToolbar
          sortOrder={noteList.sortOrder}
          onSortOrderChange={noteList.setSortOrder}
        />
        <NotesList
          notes={noteList.notes}
          onNoteSelect={noteDetail.selectNote}
          onNoteDelete={noteDelete.requestDelete}
          isLoading={noteList.isLoading}
          isError={noteList.hasInitialLoadError}
          errorTitle={noteList.errorInfo.title}
          errorMessage={noteList.errorInfo.message}
          canRetry={noteList.errorInfo.canRetry}
          hasSearchTerm={noteList.hasSearchTerm}
          onRetry={noteList.retry}
        />
        {noteList.hasNextPage && !noteList.isLoading && !noteList.hasInitialLoadError && (
          <div className="mt-24 flex justify-center md:mt-32">
            <div className="text-center">
              {noteList.isFetchNextPageError && (
                <p className="text-body-sm text-error mb-8">{noteList.errorInfo.message}</p>
              )}
              <Button
                type="button"
                variant="outline"
                size="xl"
                disabled={noteList.isFetchingNextPage}
                onClick={noteList.loadMore}
              >
                {noteList.isFetchingNextPage
                  ? "불러오는 중..."
                  : noteList.isFetchNextPageError
                    ? "다시 시도"
                    : "노트 더 보기"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {noteDetail.selectedNoteId !== null && (
        <NoteDetailPanel
          note={noteDetail.note}
          isOpen={noteDetail.isOpen}
          isLoading={noteDetail.isLoading}
          isError={noteDetail.isError}
          isNotFound={noteDetail.isNotFound}
          errorTitle={noteDetail.errorInfo.title}
          errorMessage={noteDetail.errorInfo.message}
          canRetry={noteDetail.errorInfo.canRetry}
          onClose={noteDetail.close}
          onEdit={noteDetail.note ? handleEditNote : undefined}
          onNotFoundClose={noteDetail.closeNotFound}
          onRetry={noteDetail.retry}
        />
      )}

      {noteDelete.candidate && (
        <NoteDeleteDialog
          noteTitle={noteDelete.candidate.title}
          isOpen={noteDelete.isOpen}
          isDeleting={noteDelete.isDeleting}
          errorTitle={noteDelete.hasError ? noteDelete.errorInfo.title : ""}
          errorMessage={noteDelete.hasError ? noteDelete.errorInfo.message : ""}
          onClose={noteDelete.closeDialog}
          onConfirm={noteDelete.confirmDelete}
        />
      )}
    </div>
  );
}
