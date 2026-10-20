import { isAxiosError } from "axios";

/** 4xx는 재시도하지 않고, 네트워크·5xx·일반 오류는 한 번 재시도한다.
 * axios가 아닌 에러도 한 번 재시도한다.*/
export const shouldRetryQuery = (failureCount: number, error: unknown) => {
  if (failureCount >= 1) return false;
  if (!isAxiosError(error)) return true;

  const status = error.response?.status;
  return status === undefined || status >= 500;
};
