"use client";

import styles from "./NoteWrite.module.css";
import NoteEditor from "./components/NoteEditor";
import NoteMetaPanel from "./components/NoteMetaPanel";
import NoteWriteHeader, { NoteActions } from "./components/NoteWriteHeader";
import { Burger, X } from "@/assets/icons";
import Sidebar from "@/components/layout/Sidebar";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import Profile from "@/components/ui/Profile";
import { useState } from "react";

function MobileHeader({ menuOpen, onMenuOpen }: { menuOpen: boolean; onMenuOpen: () => void }) {
  return (
    <header className="border-border flex h-72 items-center justify-between border-b bg-white px-16 md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="md"
        className="px-6"
        aria-label="메뉴 열기"
        aria-expanded={menuOpen}
        onClick={onMenuOpen}
      >
        <Burger className="size-24" />
      </Button>
      <Logo
        variant="horizontalWithTagline"
        className="h-52"
        priority
      />
      <Profile
        variant="default"
        className="w-40"
      />
    </header>
  );
}

export default function NoteWrite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleDraft = () => {
    setStatusMessage("Storybook 로컬 상태에 임시저장되었습니다.");
  };

  const handleSubmit = () => {
    setStatusMessage("등록하기 UI를 확인했습니다. 서버 요청은 전송하지 않습니다.");
  };

  const handleBack = () => {
    setStatusMessage("Storybook 전용 화면이므로 페이지 이동은 생략합니다.");
  };

  return (
    <div className={`${styles.page} bg-surface text-foreground flex min-h-screen w-full`}>
      <div className="sticky top-0 hidden h-screen md:block [&>aside]:h-full [&>aside]:min-h-0">
        <Sidebar />
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="메뉴 닫기"
            className="absolute inset-0 bg-neutral-900/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative h-full w-280 [&>aside]:h-full [&>aside]:min-h-0">
            <Sidebar />
            <Button
              type="button"
              variant="ghost"
              size="md"
              aria-label="메뉴 닫기"
              className="absolute top-16 right-16 px-6"
              onClick={() => setMenuOpen(false)}
            >
              <X className="size-20" />
            </Button>
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <MobileHeader
          menuOpen={menuOpen}
          onMenuOpen={() => setMenuOpen(true)}
        />

        <main className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-112 md:px-32 md:pt-40 md:pb-40 xl:px-40">
          <NoteWriteHeader
            onBack={handleBack}
            onDraft={handleDraft}
            onSubmit={handleSubmit}
            statusMessage={statusMessage}
          />

          <div className="grid min-w-0 gap-16 xl:grid-cols-3 xl:gap-20">
            <div className="min-w-0 xl:col-span-2">
              <NoteEditor />
            </div>
            <NoteMetaPanel />
          </div>
        </main>
      </div>

      <div className="border-border fixed inset-x-0 bottom-0 z-30 border-t bg-white p-16 shadow-lg md:hidden">
        <NoteActions
          onDraft={handleDraft}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
