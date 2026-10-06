import Logo from "@/components/ui/Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex flex-1 items-center justify-center px-20 py-40 md:px-40 xl:px-80">
      <div className="xl:bg-surface-card flex w-full max-w-684 flex-col gap-32 xl:max-w-1220 xl:flex-row xl:gap-0 xl:overflow-hidden xl:rounded-3xl xl:shadow-md">
        <div className="bg-primary-50 flex flex-col gap-8 rounded-2xl p-24 md:gap-12 md:rounded-3xl md:p-48 xl:flex-1 xl:rounded-none xl:p-68">
          <Logo
            variant="horizontal"
            className="mb-8 w-120 md:w-160 xl:mb-40"
          />
          <p className="text-display text-foreground-title">오늘도, 한 걸음 더</p>
          <p className="text-body-lg text-neutral-600">작은 반복이 큰 변화를 만들어요.</p>
        </div>
        <div className="md:bg-surface-card flex w-full flex-col justify-center md:mx-auto md:max-w-lg md:rounded-3xl md:p-40 md:shadow-md xl:mx-0 xl:max-w-none xl:flex-1 xl:rounded-none xl:px-68 xl:py-60 xl:shadow-none">
          {children}
        </div>
      </div>
    </main>
  );
}
