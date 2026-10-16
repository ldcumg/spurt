import { environment } from "./config/env";
import * as Sentry from "@sentry/nextjs";

export const register = async () => {
  if (environment.isNode) {
    await import("../sentry.server.config");
  }

  if (environment.isEdge) {
    await import("../sentry.edge.config");
  }
};

export const onRequestError = Sentry.captureRequestError;
