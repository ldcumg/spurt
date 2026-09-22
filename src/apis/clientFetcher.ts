import { API_PATH } from "@/constants";
import ROUTES from "@/constants/routes";
import axios, { AxiosError } from "axios";

export const clientFetcher = axios.create({ baseURL: "/api" });

clientFetcher.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config;

    if (error.response?.status !== 401 || !original) {
      return Promise.reject(error);
    }

    // 토큰 재발급 요청의 401 (로그인 페이지 이동)
    if (original.url?.includes(API_PATH.auth.refresh)) {
      return Promise.reject(error);
    }

    try {
      await clientFetcher.post(API_PATH.auth.refresh);
      return clientFetcher(original);
    } catch {
      window.location.href = ROUTES.login;
      return Promise.reject(error);
    }
  },
);
