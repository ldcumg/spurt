import { AUTH_API_PATH, BASE_URL } from "@/constants/apiEndpoints";
import ROUTES from "@/constants/routes";
import axios, { type AxiosError } from "axios";

export const clientFetcher = axios.create({ baseURL: BASE_URL.client });

clientFetcher.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 401일 때 로그인 페이지로 이동
    if (error.response?.status === 401 && !error.config?.url?.includes(AUTH_API_PATH.login)) {
      window.location.href = ROUTES.login;
    }
    return Promise.reject(error);
  },
);
