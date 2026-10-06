import { Download, Link, Temporary } from "@/assets/icons";
import type { TodoResponse } from "@/types/todos.types";

interface TodoContentsProps {
  todo: TodoResponse;
}

export default function TodoContents({ todo: { fileUrl, linkUrl, noteIds } }: TodoContentsProps) {
  return (
    <div className="flex flex-col gap-24">
      {(fileUrl || linkUrl) && (
        <div className="flex flex-col gap-12">
          <h3 className="text-title-xs">첨부자료</h3>
          {fileUrl && (
            <div className="flex flex-row items-center gap-8">
              <Temporary className="size-24" />
              <span>{fileUrl}</span>
              <Download className="size-24" />
            </div>
          )}
          {linkUrl && (
            <div className="flex flex-row items-center gap-8">
              <Link className="size-24" />
              <span>{linkUrl}</span>
            </div>
          )}
        </div>
      )}

      {/* TODO */}
      {noteIds.length > 0 && (
        <div>
          <h3 className="text-title-xs">작성된 노트</h3>
        </div>
      )}
    </div>
  );
}
