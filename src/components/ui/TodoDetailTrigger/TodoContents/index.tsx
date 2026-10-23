import { downloadFile } from "../index.services";
import { parseFileUrl } from "../index.utils";
import NoteSection from "./NoteSection";
import { Download, Link, Temporary } from "@/assets/icons";
import type { NoteResponse } from "@/types/notes.types";
import type { TodoResponse } from "@/types/todos.types";

interface TodoContentsProps {
  todo: TodoResponse;
  handleNoteDetailOpen: (note: NoteResponse) => void;
}

export default function TodoContents({ todo: { fileUrl, linkUrl, noteIds }, handleNoteDetailOpen }: TodoContentsProps) {
  const parsedFile = fileUrl ? parseFileUrl(fileUrl) : null;

  return (
    <div className="text-body-md md:text-body-lg flex flex-col gap-24">
      {(fileUrl || linkUrl) && (
        <div className="flex flex-col gap-12">
          <h3 className="text-title-xs md:text-title-sm">첨부자료</h3>

          {parsedFile && (
            <div className="flex flex-row items-center justify-between">
              <span className="flex flex-row gap-8">
                <Temporary className="size-24 text-neutral-400" />
                <span>{parsedFile.name ?? "file"}</span>
              </span>
              <button
                onClick={() => downloadFile(parsedFile.url)}
                type="button"
              >
                <Download className="size-24" />
              </button>
            </div>
          )}

          {linkUrl && (
            <div className="flex flex-row items-center gap-8">
              <Link className="size-24 text-neutral-400" />
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkUrl}
              </a>
            </div>
          )}
        </div>
      )}

      {noteIds.length > 0 && (
        <NoteSection
          noteIds={noteIds}
          handleNoteDetailOpen={handleNoteDetailOpen}
        />
      )}
    </div>
  );
}
