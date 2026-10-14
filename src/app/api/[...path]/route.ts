import { ALLOWED_METHODS } from "@/constants/allowedMethods";
import { serverFetcher } from "@/lib/axios/serverFetcher";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ path: string[] }> };

async function handler(request: NextRequest, { params }: Params) {
  const { path } = await params;

  const key = "/" + path.map((s) => (/^\d+$/.test(s) ? ":id" : s)).join("/");
  const allowed = ALLOWED_METHODS[key];

  if (!allowed?.includes(request.method)) {
    return NextResponse.json({ message: "접근이 제한되었습니다." }, { status: 403 });
  }

  try {
    const pathname = `/${path.join("/")}`;
    const method = request.method;
    const body = request.body ? await request.json() : undefined;
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);

    const { data, status } = await serverFetcher(pathname, { method, data: body, params: searchParams });

    if (status === 204) return new NextResponse(null, { status });

    return NextResponse.json(data, { status });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ message: "요청 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
