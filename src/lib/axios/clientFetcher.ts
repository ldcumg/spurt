import { BASE_URL } from "@/constants/apiEndpoints";
import axios from "axios";

export const clientFetcher = axios.create({ baseURL: BASE_URL.client });

// promise를 락처럼 사용
// 여러 요청이 동시에 401 받아도 토큰 재발급은 한번만 요청하도록
// let refreshPromise: Promise<unknown> | null = null;

// clientFetcher.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     // _retry: 요청 재시도 여부 표시용 플래그
//     const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

//     if (error.response?.status !== 401 || !original) {
//       return Promise.reject(error);
//     }

//     // 재요청 불가 처리 (토큰 재발급 요청의 401 + 토큰 재발급 후 다시 보낸 원래 요청의 401 + (임시) 로그인 요청의 401)
//     if (
//       original.url?.includes(AUTH_API_PATH.login) ||
//       original.url?.includes(AUTH_API_PATH.refresh) ||
//       original._retry
//     ) {
//       return Promise.reject(error);
//     }
//     original._retry = true;

//     refreshPromise ??= clientFetcher.post(AUTH_API_PATH.refresh).finally(() => {
//       refreshPromise = null;
//     });

//     try {
//       await refreshPromise;
//       return clientFetcher(original);
//     } catch {
//       window.location.href = ROUTES.login;
//       return Promise.reject(error);
//     }
//   },
// );
