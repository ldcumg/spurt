import { downloadFile } from "../index.services";
import { getFileName } from "../index.utils";
import { Download, Link, Temporary } from "@/assets/icons";
import type { TodoResponse } from "@/types/todos.types";

interface TodoContentsProps {
  todo: TodoResponse;
}

export default function TodoContents({ todo: { fileUrl, linkUrl, noteIds } }: TodoContentsProps) {
  return (
    <div className="text-body-md md:text-body-lg flex flex-col gap-24">
      {(fileUrl || linkUrl) && (
        <div className="flex flex-col gap-12">
          <h3 className="text-title-xs md:text-title-sm">첨부자료</h3>

          {fileUrl && (
            <div className="flex flex-row items-center justify-between">
              <span className="flex flex-row gap-8">
                <Temporary className="size-24 text-neutral-400" />
                <span>{getFileName(fileUrl)}</span>
              </span>
              <button
                onClick={() => downloadFile(fileUrl)}
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

      {/* TODO */}
      {noteIds.length > 0 && (
        <div>
          <h3 className="text-title-xs md:text-title-sm">작성된 노트</h3>
        </div>
      )}
    </div>
  );
}
