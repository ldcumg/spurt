import { ACCESS_TOKEN, AUTH_COOKIE_OPTIONS, REFRESH_TOKEN } from "@/config/cookie";
import { AUTH_API_PATH, BASE_URL } from "@/constants/apiEndpoints";
import ROUTES from "@/constants/routes";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "@/constants/timeConstants";
import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AuthRefreshResponse } from "./types/auth.types";

// 서버 컴포넌트의 토큰 재발급 로직
const refreshAccessToken = async (request: NextRequest) => {
  try {
    const {data} = await axios.post<AuthRefreshResponse>(`${BASE_URL.server}${AUTH_API_PATH.refresh}`, {
      refreshToken: request.cookies.get(REFRESH_TOKEN)?.value,
    });

    request.cookies.set(ACCESS_TOKEN, data.accessToken);
    // 10초 유예시간 내 재요청 대응
    if (data.refreshToken) request.cookies.set(REFRESH_TOKEN, data.refreshToken);

    const response = NextResponse.next({ request: { headers: request.headers } });
    response.cookies.set(ACCESS_TOKEN, data.accessToken, { ...AUTH_COOKIE_OPTIONS, maxAge: ACCESS_TOKEN_MAX_AGE });
    if (data.refreshToken) {
      response.cookies.set(REFRESH_TOKEN, data.refreshToken, { ...AUTH_COOKIE_OPTIONS, maxAge: REFRESH_TOKEN_MAX_AGE });
    }
    return response;
  } catch (error) {
    // 쿠키 삭제 후 로그인 페이지로 이동 (유효하지 않은 refreshToken, 토큰 값 형식 이슈)
    if (isAxiosError(error) && error.response && error.response.status < 500) {
      const response = NextResponse.redirect(new URL(ROUTES.login, request.url));
      response.cookies.delete(ACCESS_TOKEN);
      response.cookies.delete(REFRESH_TOKEN);
      return response;
    }
    // 백엔드 또는 네트워크 이슈
    console.error("[proxy]", error);
    return NextResponse.next();
  }
};

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname === ROUTES.login || pathname === ROUTES.signup;
  const hasRefreshToken = request.cookies.has(REFRESH_TOKEN);

  if (isAuthPage) {
    return hasRefreshToken ? NextResponse.redirect(new URL(ROUTES.dashboard, request.url)) : NextResponse.next();
  }

  if (!hasRefreshToken) return NextResponse.redirect(new URL(ROUTES.login, request.url));
  if (!request.cookies.has(ACCESS_TOKEN)) return refreshAccessToken(request);
  return NextResponse.next();
};

// proxy 실행 경로
// route handler, 정적 파일 등 제외
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
