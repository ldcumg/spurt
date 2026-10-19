// 실행 환경
export const NODE_ENV = process.env.NODE_ENV;
export const nodeEnvironment = {
  isDevelopment: NODE_ENV === "development",
  isProduction: NODE_ENV === "production",
  isTest: NODE_ENV === "test",
  isNode: process.env.NEXT_RUNTIME === "nodejs",
  isEdge: process.env.NEXT_RUNTIME === "edge",
};

// vercel 배포 환경
export const VERCEL_ENV = process.env.VERCEL_ENV;
export const vercelEnviroment = {
  isProduction: VERCEL_ENV === "production",
  isPreview: VERCEL_ENV === "preview",
};

// api base url
export const BACKEND_BASE_URL = process.env.API_BASE_URL;
export const TEAM_ID = process.env.TEAM_ID;

// sentry
export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
export const SENTRY_CLIENT_SECRET = process.env.SENTRY_CLIENT_SECRET;
export const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
