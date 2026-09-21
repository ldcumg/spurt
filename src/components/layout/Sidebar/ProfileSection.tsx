import { MOCK_USER } from "./mock";

export default function ProfileSection() {
  return (
    <div className="flex items-center gap-8 rounded-full border border-neutral-200 p-12">
      <div className="bg-primary-100 size-36 shrink-0 rounded-full" />
      <div className="min-w-0">
        <p className="text-title-xs truncate text-neutral-700">{MOCK_USER.name}</p>
        <p className="text-caption truncate text-neutral-400">{MOCK_USER.email}</p>
      </div>
    </div>
  );
}
