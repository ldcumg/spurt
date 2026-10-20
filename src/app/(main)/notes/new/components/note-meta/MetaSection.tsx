import { Under } from "@/assets/icons";
import type { ReactNode } from "react";

interface MetaSectionProps {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
}

/** 노트 부가 정보 섹션에서 공통으로 사용하는 카드와 헤더를 표시한다. */
export default function MetaSection({ icon, title, description, children }: MetaSectionProps) {
  return (
    <section className="border-border bg-surface-card rounded-xl border p-16 shadow-sm md:p-20">
      <header className="mb-16 flex items-start gap-12">
        <span className="bg-primary-50 text-primary-600 flex size-40 shrink-0 items-center justify-center rounded-full">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-title-xs text-foreground-title md:text-title-sm">{title}</h2>
          {description && <p className="text-body-sm md:text-body-md mt-2 text-neutral-500">{description}</p>}
        </div>
        <Under className="size-18 rotate-180 text-neutral-600 md:hidden" />
      </header>
      {children}
    </section>
  );
}
