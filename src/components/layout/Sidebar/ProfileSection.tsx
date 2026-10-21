"use client";

import Button from "@/components/ui/Button";
import Profile from "@/components/ui/Profile";
import ROUTES from "@/constants/routes";
import { useClickOutside } from "@/hooks/disclosure/useClickOutside";
import { useDisclosure } from "@/hooks/disclosure/useDisclosure";
import { useLogoutMutation } from "@/hooks/mutations/auth/useAuthMutations";
import { useUserQuery } from "@/hooks/queries/user/useUserQueries";
import { useRouter } from "next/navigation";

export default function ProfileSection() {
  const { data: user } = useUserQuery();

  const { isOpen, toggle, close } = useDisclosure();
  const containerRef = useClickOutside(close);

  const router = useRouter();
  const { mutate: logout, isPending } = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined, { onSuccess: () => router.replace(ROUTES.login) });
  };

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <Button
        type="button"
        variant="ghost"
        onClick={toggle}
        className="flex h-auto w-full items-center gap-12 rounded-full border border-neutral-200 p-12 text-left"
      >
        <Profile className="w-36" />
        <div className="min-w-0">
          <p className="text-body-md truncate font-semibold text-neutral-700">{user?.name}</p>
          <p className="text-caption truncate text-neutral-400">{user?.email}</p>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute bottom-full left-0 z-10 mb-8 flex w-full flex-col gap-4 rounded-xl bg-white p-12 shadow-lg">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="text-body-md w-full text-left font-medium text-neutral-700"
          >
            프로필 편집
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={handleLogout}
            disabled={isPending}
            className="text-body-md w-full text-left font-medium text-neutral-500"
          >
            로그아웃
          </Button>
        </div>
      )}
    </div>
  );
}
