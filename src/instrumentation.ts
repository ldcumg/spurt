import { nodeEnvironment } from "./config/env";
import * as Sentry from "@sentry/nextjs";

export const register = async () => {
  if (nodeEnvironment.isNode) {
    await import("../sentry.server.config");
  }

  if (nodeEnvironment.isEdge) {
    await import("../sentry.edge.config");
  }
};

export const onRequestError = Sentry.captureRequestError;
