import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";

// Sentry 대시보드에서 백엔드 에러임을 쉽게 식별하기 위한 커스텀 에러 클래스
class SentryAPIError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryAPIError";
  }
}

// A faulty API route to test Sentry's error monitoring
export function GET() {
  // Sentry 내부 시스템 로그에 API 호출 사실을 기록
  Sentry.logger.info("Sentry API called");
  // 의도적으로 백엔드 에러를 발생
  // 이 에러는 instrumentation.ts의 onRequestError 등을 통해 Sentry로 자동 전송
  throw new SentryAPIError("This error is raised on the backend called by the page.");
}
