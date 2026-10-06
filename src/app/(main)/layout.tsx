import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-dvh">
      <div className="hidden h md:block">
        <Sidebar />
      </div>
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
