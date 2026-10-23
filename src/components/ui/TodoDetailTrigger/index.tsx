"use client";

import Modal from "../Modal";
import TodoContents from "./TodoContents";
import TodoInfo from "./TodoInfo";
import NoteDetailPanel from "@/app/(main)/notes/components/NoteDetailPanel";
import { toNoteViewModel, type NoteViewModel } from "@/app/(main)/notes/noteViewModel";
import Badge from "@/components/ui/Badge";
import { useClickOutside } from "@/hooks/disclosure/useClickOutside";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import type { NoteResponse } from "@/types/notes.types";
import type { TodoResponse } from "@/types/todos.types";
import { useState } from "react";

interface TodoDetailTriggerProps {
  todo: TodoResponse;
  renderItem: (todoDetailOpen: () => void) => React.ReactNode;
}

export default function TodoDetailTrigger({ todo, renderItem }: TodoDetailTriggerProps) {
  const { isOpen: todoDetailIsOpen, open: todoDetailOpen, close: todoDetailClose } = useDisclosure();
  const { isOpen: noteDetailIsOpen, open: noteDetailOpen, close: noteDetailClose } = useDisclosure();
  const [selectedNote, setSelectedNote] = useState<NoteViewModel | null>(null);

  /** 모달 바깥 부분 클릭 시 모달 닫기 */
  const containerRef = useClickOutside(() => {
    todoDetailClose();
  });

  /** 노트 상세 패널 열기 */
  const handleNoteDetailOpen = (note: NoteResponse) => {
    todoDetailClose();
    const noteViewModel = toNoteViewModel(note, note.todo.goal.title);
    setSelectedNote(noteViewModel);
    noteDetailOpen();
  };

  return (
    <>
      {renderItem(todoDetailOpen)}
      <Modal
        className="p-32 md:p-40"
        ref={containerRef}
        title={
          <span className="flex w-full flex-row gap-12 md:gap-16">
            <span>{todo.title}</span>
            <Badge type={todo.done ? "done" : "todo"} />
          </span>
        }
        isOpen={todoDetailIsOpen}
        onClose={todoDetailClose}
      >
        <div className="flex h-full w-full flex-col gap-24 pt-24">
          <TodoInfo todo={todo} />
          <TodoContents
            todo={todo}
            handleNoteDetailOpen={handleNoteDetailOpen}
          />
        </div>
      </Modal>

      <NoteDetailPanel
        note={selectedNote}
        isOpen={noteDetailIsOpen}
        onClose={() => {
          noteDetailClose();
          todoDetailOpen();
        }}
      />
    </>
  );
}
