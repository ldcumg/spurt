import type { Viewport } from "./types";

export const MEDIA_QUERIES = {
  isMobile: "(max-width: 767px)",
  isTablet: "(min-width: 768px) and (max-width: 1279px)",
  isDesktop: "(min-width: 1280px)",
} as const;

export const SERVER_VIEWPORT: Viewport = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
};
