import { ACCESS_TOKEN } from "@/config/cookie";
import { BASE_URL, TEAM_ID } from "@/config/env";
import { HTTP_HEADERS } from "@/config/httpRequestHeaders";
import { ALLOWED_METHODS } from "@/constants/allowedMethods";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ path: string[] }> };

async function proxy(request: NextRequest, { params }: Params) {
  const { path } = await params;

  const key = path.map((s) => (/^\d+$/.test(s) ? ":id" : s)).join("/");
  const allowed = ALLOWED_METHODS[key];

  if (!allowed?.includes(request.method)) {
    return NextResponse.json({ message: "접근이 제한되었습니다." }, { status: 403 });
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;

  try {
    const { data, status } = await axios({
      url: `${BASE_URL}/${TEAM_ID}/${path.join("/")}${request.nextUrl.search}`,
      method: request.method,
      headers: HTTP_HEADERS(accessToken),
      data: await request.text(),
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ message: "요청 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
