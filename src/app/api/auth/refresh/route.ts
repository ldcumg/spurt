import { postRefresh } from "@/apis/auth/api";
import { ACCESS_TOKEN, AUTH_COOKIE_OPTIONS, REFRESH_TOKEN } from "@/config/cookie";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "@/constants/timeConstants";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  if (!refreshToken) {
    return NextResponse.json({ message: "인증 정보가 없습니다." }, { status: 401 });
  }

  try {
    const {
      data: { accessToken, refreshToken: newRefreshToken },
    } = await postRefresh({ refreshToken });

    const response = NextResponse.json({ message: "토큰이 재발급되었습니다." });

    response.cookies.set(ACCESS_TOKEN, accessToken, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    // 10초 유예시간 내 재요청 대응
    if (newRefreshToken) {
      response.cookies.set(REFRESH_TOKEN, newRefreshToken, {
        ...AUTH_COOKIE_OPTIONS,
        maxAge: REFRESH_TOKEN_MAX_AGE,
      });
    }

    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const response = NextResponse.json(error.response.data, {
        status: error.response.status,
      });

      // 토큰이 쿠키에 남아있지만 백엔드에서 만료된 상태 대응
      if (error.response.status === 401) {
        response.cookies.delete(ACCESS_TOKEN);
        response.cookies.delete(REFRESH_TOKEN);
      }

      return response;
    }

    console.error("[auth/refresh]", error);

    return NextResponse.json({ message: "토큰 재발급 중 오류가 발생했습니다." }, { status: 500 });
  }
}
