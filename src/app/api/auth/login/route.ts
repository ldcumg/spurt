import { postLogin } from "@/apis/auth/api";
import { ACCESS_TOKEN, AUTH_COOKIE_OPTIONS, REFRESH_TOKEN } from "@/config/cookie";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "@/constants/timeConstants";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const { accessToken, refreshToken, user } = await postLogin({ email, password });

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
    // request body가 json 형식이 아닌 경우
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 400 });
    }

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
