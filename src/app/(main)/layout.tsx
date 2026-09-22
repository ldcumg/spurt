import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-1">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1">{children}</main>
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
