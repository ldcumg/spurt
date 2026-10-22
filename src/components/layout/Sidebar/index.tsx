import ActionSection from "./ActionSection";
import GoalSection from "./GoalSection";
import NavSection from "./NavSection";
import ProfileSection from "./ProfileSection";
import Logo from "@/components/ui/Logo";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-280 shrink-0 flex-col justify-between bg-white px-20 py-32 shadow-sm">
      <div className="flex flex-col gap-24">
        <Link
          href={ROUTES.dashboard}
          className="mr-auto"
        >
          <Logo
            variant="horizontalWithTagline"
            className="h-56"
          />
        </Link>
        <NavSection />
        <hr className="border-neutral-200" />
        <GoalSection />
      </div>
      <div className="flex flex-col gap-24">
        <ActionSection />
        <ProfileSection />
      </div>
    </aside>
  );
}
