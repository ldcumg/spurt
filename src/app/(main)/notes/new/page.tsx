"use client";

import MobileNavigation from "../components/MobileNavigation";
import NoteEditor from "./components/NoteEditor";
import NoteMetaPanel from "./components/NoteMetaPanel";
import NoteWriteHeader, { NoteActions } from "./components/NoteWriteHeader";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewNotePage() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("");

  const handleDraft = () => {
    setStatusMessage("임시저장 UI를 확인했습니다. 서버 요청은 아직 연결되지 않았습니다.");
  };

  const handleSubmit = () => {
    setStatusMessage("등록하기 UI를 확인했습니다. 서버 요청은 아직 연결되지 않았습니다.");
  };

  return (
    <div className="bg-surface text-foreground min-h-screen w-full min-w-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-50),var(--color-surface)_56%)]">
      <MobileNavigation />

      <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-100 md:px-32 md:pt-40 md:pb-40 xl:px-40">
        <NoteWriteHeader
          onBack={() => router.push(ROUTES.notes)}
          onDraft={handleDraft}
          onSubmit={handleSubmit}
          statusMessage={statusMessage}
        />

        <div className="mb-16 hidden grid-cols-3 gap-20 xl:grid">
          <NoteActions
            onDraft={handleDraft}
            onSubmit={handleSubmit}
            className="col-span-2 justify-end"
          />
        </div>

        <div className="grid min-w-0 gap-16 xl:grid-cols-3 xl:gap-20">
          <div className="min-w-0 xl:col-span-2">
            <NoteEditor />
          </div>
          <NoteMetaPanel />
        </div>

        <div className="mt-16 md:hidden">
          <NoteActions
            onDraft={handleDraft}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
