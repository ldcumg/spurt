// 실행 환경
export const NODE_ENV = process.env.NODE_ENV;
export const environment = {
  isDevelopment: NODE_ENV === "development",
  isProduction: NODE_ENV === "production",
  isTest: NODE_ENV === "test",
};

// api base url
export const BACKEND_BASE_URL: string = process.env.API_BASE_URL!;
export const TEAM_ID: string = process.env.TEAM_ID!;

// sentry
export const SENTRY_CLIENT_SECRET = process.env.SENTRY_CLIENT_SECRET;
export const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
