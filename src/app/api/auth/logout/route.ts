import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/config/cookie";
import { BASE_URL, TEAM_ID } from "@/config/env";
import { API_PATH } from "@/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  if (refreshToken) {
    try {
      await axios.post(`${BASE_URL}/${TEAM_ID}${API_PATH.auth.logout}`, { refreshToken });
    } catch (error) {
      console.error("[auth/logout]", error);
    }
  }

  const response = NextResponse.json({ message: "로그아웃 되었습니다." });
  response.cookies.delete(ACCESS_TOKEN);
  response.cookies.delete(REFRESH_TOKEN);

  return response;
}
