"use client";

import { Left, NoteFilled } from "@/assets/icons";
import Button from "@/components/ui/Button";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";

interface EditPageStateProps {
  title: string;
  description: string;
  isLoading?: boolean;
  onRetry?: () => void;
}

/** 노트 수정 페이지의 로딩, 오류, 찾을 수 없음 상태를 표시한다. */
export default function EditPageState({ title, description, isLoading = false, onRetry }: EditPageStateProps) {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-100 md:px-32 md:pt-40 md:pb-40 xl:px-40">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-body-md mb-16 inline-flex items-center gap-4 px-4 text-neutral-600"
        onClick={() => router.push(ROUTES.notes)}
      >
        <Left className="size-18" />
        노트로 돌아가기
      </Button>
      <section
        role={isLoading ? "status" : "alert"}
        className="border-border bg-surface-card flex min-h-320 flex-col items-center justify-center rounded-xl border px-24 text-center shadow-sm"
      >
        <NoteFilled className="mb-12 size-44 text-neutral-400" />
        <h1 className="text-title-md text-foreground-title">{title}</h1>
        <p className="text-body-md mt-8 text-neutral-600">{description}</p>
        {onRetry && !isLoading && (
          <Button
            type="button"
            variant="outline"
            size="md"
            className="mt-16"
            onClick={onRetry}
          >
            다시 시도
          </Button>
        )}
      </section>
    </div>
  );
}
