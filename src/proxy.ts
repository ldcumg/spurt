// import { ACCESS_TOKEN, AUTH_COOKIE_OPTIONS, REFRESH_TOKEN } from "@/config/cookie";
// import { BASE_URL, TEAM_ID } from "@/config/env";
// import { ACCESS_TOKEN_MAX_AGE, API_PATH, REFRESH_TOKEN_MAX_AGE } from "@/constants";
// import ROUTES from "@/constants/routes";
// import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";

// import type { NextRequest } from "next/server";

// // 서버 컴포넌트의 토큰 재발급 로직
// const refreshAccessToken = async (request: NextRequest) => {
//   try {
//     const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
//     const { data } = await axios.post(`${BASE_URL}/${TEAM_ID}${API_PATH.auth.refresh}`, { refreshToken });
//     const { accessToken, refreshToken: newRefreshToken } = data;

//     request.cookies.set(ACCESS_TOKEN, accessToken);
//     // 10초 유예시간 내 재요청 대응
//     if (newRefreshToken) request.cookies.set(REFRESH_TOKEN, newRefreshToken);

//     const response = NextResponse.next({ request: { headers: request.headers } });
//     response.cookies.set(ACCESS_TOKEN, accessToken, { ...AUTH_COOKIE_OPTIONS, maxAge: ACCESS_TOKEN_MAX_AGE });
//     if (newRefreshToken) {
//       response.cookies.set(REFRESH_TOKEN, newRefreshToken, { ...AUTH_COOKIE_OPTIONS, maxAge: REFRESH_TOKEN_MAX_AGE });
//     }

//     return response;
//   } catch (error) {
//     // 쿠키 삭제 후 로그인 페이지로 이동 (유효하지 않은 refreshToken, 토큰 값 형식 이슈)
//     if (isAxiosError(error) && error.response && error.response.status < 500) {
//       const response = NextResponse.redirect(new URL(ROUTES.login, request.url));
//       response.cookies.delete(ACCESS_TOKEN);
//       response.cookies.delete(REFRESH_TOKEN);
//       return response;
//     }
//     // 백엔드 또는 네트워크 이슈
//     console.error("[proxy]", error);
//     return NextResponse.next();
//   }
// };

// export const proxy = async (request: NextRequest) => {
//   const { pathname } = request.nextUrl;
//   const isLoginPage = pathname === ROUTES.login;
//   const hasRefreshToken = request.cookies.has(REFRESH_TOKEN);

//   if (!hasRefreshToken && !isLoginPage) {
//     return NextResponse.redirect(new URL(ROUTES.login, request.url));
//   }

//   if (hasRefreshToken && isLoginPage) {
//     return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
//   }

//   // accessToken만 만료되었을시 토큰 재발급
//   if (hasRefreshToken && !request.cookies.get(ACCESS_TOKEN)?.value) {
//     return refreshAccessToken(request);
//   }

//   return NextResponse.next();
// };

// // proxy 실행 경로
// // route handler, 정적 파일 등 제외
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

export const proxy = async () => {
  return NextResponse.next();
};
