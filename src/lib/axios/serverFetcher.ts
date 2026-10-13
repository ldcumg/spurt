import { ACCESS_TOKEN, AUTH_COOKIE_OPTIONS, REFRESH_TOKEN } from "@/config/cookie";
import { HTTP_HEADERS } from "@/config/httpRequestHeaders";
import { AUTH_API_PATH, BASE_URL } from "@/constants/apiEndpoints";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "@/constants/timeConstants";
import { AuthRefreshResponse } from "@/types/auth.types";
import axios, { AxiosRequestConfig, isAxiosError, type AxiosResponse } from "axios";
import { cookies } from "next/headers";

async function refreshTokens(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;
  if (!refreshToken) return null;

  try {
    const { data } = await axios.post<AuthRefreshResponse>(`${BASE_URL.server}${AUTH_API_PATH.refresh}`, {
      refreshToken,
    });
    cookieStore.set(ACCESS_TOKEN, data.accessToken, { ...AUTH_COOKIE_OPTIONS, maxAge: ACCESS_TOKEN_MAX_AGE });

    // 10초 유예시간 내 재요청 하는 경우 대응
    if (data.refreshToken) {
      cookieStore.set(REFRESH_TOKEN, data.refreshToken, { ...AUTH_COOKIE_OPTIONS, maxAge: REFRESH_TOKEN_MAX_AGE });
    }
    return data.accessToken;
  } catch (error) {
    // 토큰이 쿠키에 남아있지만 백엔드에서는 만료된 상태 대응
    if (isAxiosError(error) && error.response?.status === 401) {
      cookieStore.delete(ACCESS_TOKEN);
      cookieStore.delete(REFRESH_TOKEN);
      return null;
    }
    throw error;
  }
}

type ServerFetcherOptions = {
  canRefresh?: boolean;
};

export async function serverFetcher<T>(
  path: string,
  config?: AxiosRequestConfig,
  { canRefresh = false }: ServerFetcherOptions = {},
): Promise<AxiosResponse<T>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

  try {
    return await axios<T>({
      url: `${BASE_URL.server}${path}`,
      ...config,
      headers: {
        ...HTTP_HEADERS(accessToken),
        ...config?.headers,
      },
    });
  } catch (error) {
    if (canRefresh && isAxiosError(error) && error.response?.status === 401) {
      const newAccessToken = await refreshTokens();
      if (newAccessToken) {
        return axios<T>({
          url: `${BASE_URL.server}${path}`,
          ...config,
          headers: {
            ...HTTP_HEADERS(newAccessToken),
            ...config?.headers,
          },
        });
      }
    }
    throw error;
  }
}
