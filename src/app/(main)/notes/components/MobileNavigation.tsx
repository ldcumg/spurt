import { Burger, X } from "@/assets/icons";
import Sidebar from "@/components/layout/Sidebar";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import Profile from "@/components/ui/Profile";
import { useState } from "react";

/** 모바일 헤더와 헤더에서 여는 Sidebar 드로어를 함께 관리한다. */
export default function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-neutral-900/40"
            aria-label="메뉴 닫기"
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

      <header className="border-border flex h-72 items-center justify-between border-b bg-white px-16 md:hidden">
        <Button
          type="button"
          variant="ghost"
          size="md"
          className="px-6"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Burger className="size-24" />
        </Button>

        <Logo
          variant="horizontalWithTagline"
          className="h-52"
          priority
        />

        <Profile
          variant="greeting"
          className="w-40"
        />
      </header>
    </>
  );
}
