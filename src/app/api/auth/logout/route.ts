import { postLogout } from "@/apis/auth/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/config/cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  if (refreshToken) {
    try {
      await postLogout({ refreshToken });
    } catch (error) {
      console.error("[auth/logout]", error);
    }
  }

  const response = NextResponse.json({ message: "로그아웃 되었습니다." });
  response.cookies.delete(ACCESS_TOKEN);
  response.cookies.delete(REFRESH_TOKEN);

  return response;
}
