import { ACCESS_TOKEN, AUTH_COOKIE_OPTIONS, REFRESH_TOKEN } from "@/config/cookie";
import { BASE_URL, TEAM_ID } from "@/config/env";
import { ACCESS_TOKEN_MAX_AGE, API_PATH, REFRESH_TOKEN_MAX_AGE } from "@/constants";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  if (!refreshToken) {
    return NextResponse.json({ message: "인증 정보가 없습니다." }, { status: 401 });
  }

  try {
    const { data } = await axios.post(`${BASE_URL}/${TEAM_ID}${API_PATH.auth.refresh}`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = data;

    const response = NextResponse.json({ message: "토큰 재발급 완료" });

    response.cookies.set(ACCESS_TOKEN, accessToken, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    response.cookies.set(REFRESH_TOKEN, newRefreshToken, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    console.error("[auth/refresh]", error);

    return NextResponse.json({ message: "토큰 재발급 중 오류가 발생했습니다." }, { status: 500 });
  }
}
