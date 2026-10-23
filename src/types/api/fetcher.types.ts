import type { AxiosRequestConfig, AxiosResponse } from "axios";

export type Fetcher = <T>(path: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
