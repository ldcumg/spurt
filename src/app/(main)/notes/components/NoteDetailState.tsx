import { NoteFilled } from "@/assets/icons";
import Button from "@/components/ui/Button";

interface NoteDetailStateProps {
  isLoading: boolean;
  isError: boolean;
  isNotFound: boolean;
  errorMessage: string;
  canRetry: boolean;
  onNotFoundClose?: () => void;
  onRetry?: () => void;
}

/** 노트 상세 조회의 로딩, 오류, 찾을 수 없음 상태를 표시한다. */
export default function NoteDetailState({
  isLoading,
  isError,
  isNotFound,
  errorMessage,
  canRetry,
  onNotFoundClose,
  onRetry,
}: NoteDetailStateProps) {
  return (
    <>
      {isLoading && (
        <div
          role="status"
          className="mt-32 flex min-h-240 items-center justify-center rounded-xl bg-neutral-50 px-24 text-center"
        >
          <p className="text-body-md text-neutral-600">노트 상세 내용을 불러오는 중이에요.</p>
        </div>
      )}

      {isNotFound && !isLoading && (
        <div
          role="alert"
          className="mt-32 flex min-h-240 flex-col items-center justify-center rounded-xl bg-neutral-50 px-24 text-center"
        >
          <NoteFilled className="mb-12 size-40 text-neutral-400" />
          <p className="text-body-md text-neutral-600">삭제되었거나 존재하지 않는 노트예요.</p>
          {onNotFoundClose && (
            <Button
              type="button"
              variant="outline"
              size="md"
              className="mt-16"
              onClick={onNotFoundClose}
            >
              목록으로 돌아가기
            </Button>
          )}
        </div>
      )}

      {isError && !isLoading && !isNotFound && (
        <div
          role="alert"
          className="mt-32 flex min-h-240 flex-col items-center justify-center rounded-xl bg-neutral-50 px-24 text-center"
        >
          <NoteFilled className="mb-12 size-40 text-neutral-400" />
          <p className="text-body-md text-neutral-600">{errorMessage}</p>
          {onRetry && canRetry && (
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
        </div>
      )}
    </>
  );
}
