"use client";

import { useUserQuery } from "@/hooks/queries/useUserQuery";

export default function ProfileSection() {
  const { data: user } = useUserQuery();

  return (
    <div className="flex items-center gap-8 rounded-full border border-neutral-200 p-12">
      <div className="bg-primary-100 size-36 shrink-0 rounded-full" />
      <div className="min-w-0">
        <p className="text-body-md truncate font-semibold text-neutral-700">{user?.name}</p>
        <p className="text-caption truncate text-neutral-400">{user?.email}</p>
      </div>
    </div>
  );
}
