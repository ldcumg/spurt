import { ACCESS_TOKEN, AUTH_COOKIE_OPTIONS, REFRESH_TOKEN } from "@/config/cookie";
import { BASE_URL, TEAM_ID } from "@/config/env";
import { ACCESS_TOKEN_MAX_AGE, API_PATH, REFRESH_TOKEN_MAX_AGE } from "@/constants";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const { data } = await axios.post(`${BASE_URL}/${TEAM_ID}${API_PATH.auth.login}`, { email, password });
    const { accessToken, refreshToken, user } = data;

    const response = NextResponse.json({ user });

    response.cookies.set(ACCESS_TOKEN, accessToken, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
    response.cookies.set(REFRESH_TOKEN, refreshToken, {
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

    // 500 구체적인 원인 확인
    console.error("[auth/login]", error);

    return NextResponse.json({ message: "로그인 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
