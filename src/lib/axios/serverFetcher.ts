import { ACCESS_TOKEN } from "@/config/cookie";
import { HTTP_HEADERS } from "@/config/httpRequestHeaders";
import { BASE_URL } from "@/constants/apiEndpoints";
import axios, { AxiosRequestConfig, type AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function serverFetcher<T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

  return axios<T>({
    url: `${BASE_URL.server}${path}`,
    ...config,
    headers: {
      ...HTTP_HEADERS(accessToken),
      ...config?.headers,
    },
  });
}
