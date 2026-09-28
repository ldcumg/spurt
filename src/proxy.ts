import { REFRESH_TOKEN } from "@/config/cookie";
import ROUTES from "@/constants/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === ROUTES.login;
  const hasRefreshToken = request.cookies.has(REFRESH_TOKEN);

  if (!hasRefreshToken && !isLoginPage) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  if (hasRefreshToken && isLoginPage) {
    return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
  }

  return NextResponse.next();
};

// proxy 실행 경로
// route handler, 정적 파일 등 제외
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
