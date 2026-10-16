// app/api/sentry-webhook/route.ts
import { DISCORD_WEBHOOK_URL, SENTRY_CLIENT_SECRET } from "@/config/env";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  // 1. SENTRY_CLIENT_SECRET, DISCORD_WEBHOOK_URL 이 없으면 에러를 반환합니다.
  if (!SENTRY_CLIENT_SECRET || !DISCORD_WEBHOOK_URL) {
    return NextResponse.json({ error: "sentry client secret 혹은 discord webhook url이 없습니다." }, { status: 500 });
  }

  // 2. 요청 본문 읽기
  // req.text()로 원문 데이터를 읽어옵니다.
  // 참고: https://nextjs.org/docs/app/api-reference/file-conventions/route#webhooks
  const rawBody = await req.text();

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Sentry에서 보낸 데이터가 유효하지 않습니다." }, { status: 400 });
  }

  // 3. HMAC 검증
  // 참고: https://docs.sentry.io/organization/integrations/integration-platform/webhooks/#sentry-hook-signature
  // HMAC: 메시지의 무결성과 인증을 보장하는 암호화 기술
  const signature = req.headers.get("sentry-hook-signature");
  // HMAC 계산을 위한 객체 생성 (SHA-256 + 비밀키)
  const hmac = crypto.createHmac("sha256", SENTRY_CLIENT_SECRET);
  // HMAC 해시값을 계산
  hmac.update(rawBody, "utf8");
  // 최종 HMAC 해시값 생성
  const digest = hmac.digest("hex");
  // 5. 비교
  if (digest !== signature) {
    return NextResponse.json({ error: "HMAC 검증에 실패했습니다. 데이터가 변조되었을 수 있습니다." }, { status: 401 });
  }

  // 4. 리소스 확인
  // 참고: https://docs.sentry.io/organization/integrations/integration-platform/webhooks/issue-alerts/
  const resource = req.headers.get("sentry-hook-resource");
  let message;

  if (resource === "event_alert" && body.action === "triggered") {
    const event = body.data.event;
    message = {
      embeds: [
        {
          title: `알림: ${event.title}`,
          description: event.web_url ? `[이벤트 ID: ${event.event_id}](${event.web_url})` : event.title,
          fields: [
            { name: "프로젝트", value: event.project ? `Project ID: ${event.project}` : "Unknown", inline: true },
            { name: "규칙", value: body.data.triggered_rule || "Unknown", inline: true },
            { name: "에러 타입", value: event.metadata?.type || "Unknown", inline: true },
            { name: "레벨", value: event.level || "Error", inline: true },
          ],
          color: 0xe02f2f,
        },
      ],
    };
  } else {
    return NextResponse.json({ message: "무시된 이벤트" });
  }

  // 5. Discord로 전송
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      throw new Error(`웹훅 전송에 실패했습니다: ${response.status}`);
    }
  } catch {
    return NextResponse.json({ error: "웹훅 전송에 실패했습니다." }, { status: 500 });
  }

  return NextResponse.json({ message: "웹훅 전송 완료" });
};
