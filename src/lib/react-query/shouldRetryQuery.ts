import { isAxiosError } from "axios";

/** 4xx는 재시도하지 않고, 네트워크 및 5xx 오류만 한 번 재시도한다. */
export const shouldRetryQuery = (failureCount: number, error: unknown) => {
  if (failureCount >= 1 || !isAxiosError(error)) return false;

  const status = error.response?.status;
  return status === undefined || status >= 500;
};
