import ActionSection from "./ActionSection";
import GoalSection from "./GoalSection";
import NavSection from "./NavSection";
import ProfileSection from "./ProfileSection";
import Logo from "@/components/ui/Logo";

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-280 shrink-0 flex-col justify-between bg-white px-20 py-32 shadow-sm">
      <div className="flex flex-col gap-24">
        <Logo
          variant="horizontalWithTagline"
          className="mr-auto h-56"
        />
        <NavSection />
        <hr className="border-neutral-200" />
        <GoalSection />
      </div>
      <div className="flex flex-col gap-32">
        <ActionSection />
        <ProfileSection />
      </div>
    </aside>
  );
}
