import { ACCESS_TOKEN } from "@/config/cookie";
import { HTTP_HEADERS } from "@/config/httpRequestHeaders";
import { BASE_URL } from "@/constants";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function serverFetcher<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

  try {
    const { data } = await axios<T>({
      url: `${BASE_URL.server}${path}`,
      ...config,
      headers: {
        ...HTTP_HEADERS(accessToken),
        ...config?.headers,
      },
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      redirect("/login");
    }
    throw error;
  }
}
