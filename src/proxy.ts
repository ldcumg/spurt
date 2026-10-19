import { ACCESS_TOKEN, AUTH_COOKIE_OPTIONS, REFRESH_TOKEN } from "@/config/cookie";
import { AUTH_API_PATH, BASE_URL } from "@/constants/apiEndpoints";
import ROUTES from "@/constants/routes";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "@/constants/timeConstants";
import { AuthRefreshResponse, AuthResponse } from "@/types/auth.types";
import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const setTokenCookies = (request: NextRequest, tokens: { accessToken: string; refreshToken: string | null }) => {
  const { accessToken, refreshToken } = tokens;

  request.cookies.set(ACCESS_TOKEN, accessToken);
  if (refreshToken) request.cookies.set(REFRESH_TOKEN, refreshToken);

  const response = NextResponse.next({ request: { headers: request.headers } });
  response.cookies.set(ACCESS_TOKEN, accessToken, { ...AUTH_COOKIE_OPTIONS, maxAge: ACCESS_TOKEN_MAX_AGE });
  if (refreshToken) {
    response.cookies.set(REFRESH_TOKEN, refreshToken, { ...AUTH_COOKIE_OPTIONS, maxAge: REFRESH_TOKEN_MAX_AGE });
  }
  return response;
};

// 서버 컴포넌트의 토큰 재발급 로직
const refreshAccessToken = async (request: NextRequest) => {
  try {
    const { data } = await axios.post<AuthRefreshResponse>(`${BASE_URL.server}${AUTH_API_PATH.refresh}`, {
      refreshToken: request.cookies.get(REFRESH_TOKEN)?.value,
    });
    // 10초 유예시간 내 재요청 대응
    return setTokenCookies(request, data);
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

const loginPerfTestUser = async (request: NextRequest) => {
  const { data } = await axios.post<AuthResponse>(`${BASE_URL.server}${AUTH_API_PATH.login}`, {
    email: process.env.PERF_TEST_EMAIL,
    password: process.env.PERF_TEST_PASSWORD,
  });
  return setTokenCookies(request, data);
};

export const proxy = async (request: NextRequest) => {
  const { pathname, searchParams } = request.nextUrl;

  if (process.env.PERF_TEST_KEY && searchParams.get("perf") === process.env.PERF_TEST_KEY) {
    return loginPerfTestUser(request);
  }

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
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
