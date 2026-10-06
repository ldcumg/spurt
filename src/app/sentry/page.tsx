"use client";

import { SENTRY_API_URL } from "@/constants/apiEndpoints";
import * as Sentry from "@sentry/nextjs";
import Head from "next/head";
import { useEffect, useState } from "react";

// Sentry 대시보드에서 일반 에러와 구분하기 쉽게 만든 커스텀 에러 클래스
class SentryFrontendError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryFrontendError";
  }
}

export default function Page() {
  const [hasSentError, setHasSentError] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Sentry 로깅: 브라우저 콘솔이 아닌 Sentry 내부 시스템에 정보를 남깁니다.
    Sentry.logger.info("Sentry page loaded");
    async function checkConnectivity() {
      // 현재 브라우저에서 Sentry 서버로 데이터를 보낼 수 있는지 확인
      // 광고 차단기(Ad-blocker) 등에 의해 통신이 막혔는지 체크할 때 유용함
      const result = await Sentry.diagnoseSdkConnectivity();
      setIsConnected(result !== "sentry-unreachable");
    }
    checkConnectivity();
  }, []);

  return (
    <div>
      <Head>
        <title>sentry-page</title>
        <meta
          name="description"
          content="Test Sentry for your Next.js app!"
        />
      </Head>

      <main>
        <div className="flex-spacer" />
        <svg
          height="40"
          width="40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Sentry logo"
        >
          <path
            d="M21.85 2.995a3.698 3.698 0 0 1 1.353 1.354l16.303 28.278a3.703 3.703 0 0 1-1.354 5.053 3.694 3.694 0 0 1-1.848.496h-3.828a31.149 31.149 0 0 0 0-3.09h3.815a.61.61 0 0 0 .537-.917L20.523 5.893a.61.61 0 0 0-1.057 0l-3.739 6.494a28.948 28.948 0 0 1 9.63 10.453 28.988 28.988 0 0 1 3.499 13.78v1.542h-9.852v-1.544a19.106 19.106 0 0 0-2.182-8.85 19.08 19.08 0 0 0-6.032-6.829l-1.85 3.208a15.377 15.377 0 0 1 6.382 12.484v1.542H3.696A3.694 3.694 0 0 1 0 34.473c0-.648.17-1.286.494-1.849l2.33-4.074a8.562 8.562 0 0 1 2.689 1.536L3.158 34.17a.611.611 0 0 0 .538.917h8.448a12.481 12.481 0 0 0-6.037-9.09l-1.344-.772 4.908-8.545 1.344.77a22.16 22.16 0 0 1 7.705 7.444 22.193 22.193 0 0 1 3.316 10.193h3.699a25.892 25.892 0 0 0-3.811-12.033 25.856 25.856 0 0 0-9.046-8.796l-1.344-.772 5.269-9.136a3.698 3.698 0 0 1 3.2-1.849c.648 0 1.285.17 1.847.495Z"
            fill="currentcolor"
          />
        </svg>
        <h1>sentry-page</h1>

        <p className="description">
          Click the button below, and view the sample error on the Sentry{" "}
          <a
            target="_blank"
            rel="noopener"
            href="https://a70671399935.sentry.io/issues/?project=4510952460845056"
          >
            Issues Page
          </a>
          . For more details about setting up Sentry,{" "}
          <a
            target="_blank"
            rel="noopener"
            href="https://docs.sentry.io/platforms/javascript/guides/nextjs/"
          >
            read our docs
          </a>
          .
        </p>

        <button
          type="button"
          onClick={async () => {
            // 버튼 클릭 이벤트를 기록
            Sentry.logger.info("User clicked the button, throwing a sample error");
            // startSpan: 특정 작업(여기서는 API 호출)의 시작과 끝을 기록하여 성능도 측정함
            // Sentry 대시보드 'Performance' 탭에서 이 작업이 얼마나 걸렸는지 확인 가능
            await Sentry.startSpan(
              {
                name: "Frontend/Backend Span",
                op: "test",
              },
              async () => {
                // 백엔드 API 호출 -> 백엔드 에러 발생
                const res = await fetch(SENTRY_API_URL);
                if (!res.ok) {
                  setHasSentError(true);
                }
              },
            );
            // 에러 강제 발생
            // 해당 에러 대시보드 'Issues'로 전송
            throw new SentryFrontendError("This error is raised on the frontend of the page.");
          }}
          disabled={!isConnected}
        >
          <span>Throw Sample Error</span>
        </button>

        {hasSentError ? (
          <p className="success">Error sent to Sentry.</p>
        ) : !isConnected ? (
          <div className="connectivity-error">
            <p>
              It looks like network requests to Sentry are being blocked, which will prevent errors from being captured.
              Try disabling your ad-blocker to complete the test.
            </p>
          </div>
        ) : (
          <div className="success_placeholder" />
        )}

        <div className="flex-spacer" />
      </main>

      <style>{`
        main {
          display: flex;
          min-height: 100vh;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          padding: 16px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
        }

        h1 {
          padding: 0px 4px;
          border-radius: 4px;
          background-color: rgba(24, 20, 35, 0.03);
          font-family: monospace;
          font-size: 20px;
          line-height: 1.2;
        }

        p {
          margin: 0;
          font-size: 20px;
        }

        a {
          color: #6341F0;
          text-decoration: underline;
          cursor: pointer;

          @media (prefers-color-scheme: dark) {
            color: #B3A1FF;
          }
        }

        button {
          border-radius: 8px;
          color: white;
          cursor: pointer;
          background-color: #553DB8;
          border: none;
          padding: 0;
          margin-top: 4px;

          & > span {
            display: inline-block;
            padding: 12px 16px;
            border-radius: inherit;
            font-size: 20px;
            font-weight: bold;
            line-height: 1;
            background-color: #7553FF;
            border: 1px solid #553DB8;
            transform: translateY(-4px);
          }

          &:hover > span {
            transform: translateY(-8px);
          }

          &:active > span {
            transform: translateY(0);
          }

          &:disabled {
	            cursor: not-allowed;
	            opacity: 0.6;

	            & > span {
	              transform: translateY(0);
	              border: none
	            }
	          }
        }

        .description {
          text-align: center;
          color: #6E6C75;
          max-width: 500px;
          line-height: 1.5;
          font-size: 20px;

          @media (prefers-color-scheme: dark) {
            color: #A49FB5;
          }
        }

        .flex-spacer {
          flex: 1;
        }

        .success {
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 20px;
          line-height: 1;
          background-color: #00F261;
          border: 1px solid #00BF4D;
          color: #181423;
        }

        .success_placeholder {
          height: 46px;
        }

        .connectivity-error {
          padding: 12px 16px;
          background-color: #E50045;
          border-radius: 8px;
          width: 500px;
          color: #FFFFFF;
          border: 1px solid #A80033;
          text-align: center;
          margin: 0;
        }

        .connectivity-error a {
          color: #FFFFFF;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
