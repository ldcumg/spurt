import { Check, Left, Temporary } from "@/assets/icons";
import infoImage from "@/assets/images/notepage/notepage_info_image.png";
import Button from "@/components/ui/Button";
import Image from "next/image";

interface NoteActionsProps {
  onDraft?: () => void;
  onSubmit: () => void;
  isSubmitDisabled?: boolean;
  isSubmitting?: boolean;
  submitLabel?: string;
  pendingLabel?: string;
  className?: string;
}

export function NoteActions({
  onDraft,
  onSubmit,
  isSubmitDisabled = false,
  isSubmitting = false,
  submitLabel = "등록하기",
  pendingLabel = "등록 중...",
  className,
}: NoteActionsProps) {
  return (
    <div className={`flex items-center gap-12 ${className ?? ""}`}>
      {onDraft && (
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="text-title-xs inline-flex flex-1 items-center justify-center gap-8 md:flex-none"
          onClick={onDraft}
        >
          <Temporary className="size-20" />
          임시저장
        </Button>
      )}
      <Button
        type="button"
        size="xl"
        className="text-title-xs inline-flex flex-1 items-center justify-center gap-8 md:flex-none"
        onClick={onSubmit}
        disabled={isSubmitDisabled || isSubmitting}
      >
        <Check className="size-20" />
        {isSubmitting ? pendingLabel : submitLabel}
      </Button>
    </div>
  );
}

interface NoteWriteHeaderProps extends NoteActionsProps {
  onBack: () => void;
  statusMessage: string;
  statusTone?: "default" | "error";
  backLabel?: string;
  heading?: string;
  description?: string;
}

export default function NoteWriteHeader({
  onBack,
  onDraft,
  onSubmit,
  isSubmitDisabled,
  isSubmitting,
  submitLabel,
  pendingLabel,
  statusMessage,
  statusTone = "default",
  backLabel = "노트로 돌아가기",
  heading = "노트 작성하기",
  description = "오늘의 생각을 정리하고, 나만의 지식을 쌓아보세요.",
}: NoteWriteHeaderProps) {
  return (
    <section className="relative mb-24 min-h-232 md:mb-32 md:min-h-208 xl:min-h-176">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-body-md mb-16 inline-flex items-center gap-4 px-4 text-neutral-600"
        onClick={onBack}
      >
        <Left className="size-18" />
        {backLabel}
      </Button>

      <div className="max-w-600 md:pr-280 xl:pr-0">
        <h1 className="text-title-lg text-foreground-title md:text-display">{heading}</h1>
        <p className="text-body-md md:text-body-lg mt-4 text-neutral-600">{description}</p>
        {statusMessage && (
          <p
            role={statusTone === "error" ? "alert" : "status"}
            className={`text-body-sm mt-8 ${statusTone === "error" ? "text-error" : "text-primary-600"}`}
          >
            {statusMessage}
          </p>
        )}
      </div>

      <Image
        src={infoImage}
        alt="기록하는 내가 조금씩 더 성장하고 있어요"
        priority
        className="absolute right-0 bottom-0 h-auto w-240 md:top-0 md:bottom-auto md:w-280 xl:w-320"
      />

      <NoteActions
        onDraft={onDraft}
        onSubmit={onSubmit}
        isSubmitDisabled={isSubmitDisabled}
        isSubmitting={isSubmitting}
        submitLabel={submitLabel}
        pendingLabel={pendingLabel}
        className="absolute right-0 bottom-0 hidden md:flex xl:hidden"
      />
    </section>
  );
}
