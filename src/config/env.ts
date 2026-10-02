/** 환경 변수 값을 가져오는 함수 */
function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

// 실행 환경
export const NODE_ENV = getEnv("NODE_ENV");
export const environment = {
  isDevelopment: NODE_ENV === "development",
  isProduction: NODE_ENV === "production",
  isTest: NODE_ENV === "test",
};

// api base url
export const BACKEND_BASE_URL: string = getEnv("API_BASE_URL");
export const TEAM_ID: string = getEnv("TEAM_ID");
