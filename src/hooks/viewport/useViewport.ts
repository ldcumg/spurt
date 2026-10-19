"use client";

import { MEDIA_QUERIES, SERVER_VIEWPORT } from "./constants";
import type { Viewport } from "./types";
import { useSyncExternalStore } from "react";

let snapshot = SERVER_VIEWPORT;
let mediaQueries: Record<keyof Viewport, MediaQueryList> | null = null;

const listeners = new Set<() => void>();

const updateSnapshot = () => {
  if (!mediaQueries) return;

  const nextSnapshot: Viewport = {
    isMobile: mediaQueries.isMobile.matches,
    isTablet: mediaQueries.isTablet.matches,
    isDesktop: mediaQueries.isDesktop.matches,
  };

  if (
    nextSnapshot.isMobile === snapshot.isMobile &&
    nextSnapshot.isTablet === snapshot.isTablet &&
    nextSnapshot.isDesktop === snapshot.isDesktop
  ) {
    return;
  }

  snapshot = nextSnapshot;

  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  if (listeners.size === 1) {
    mediaQueries = Object.fromEntries(
      Object.entries(MEDIA_QUERIES).map(([key, query]) => [key, window.matchMedia(query)]),
    ) as Record<keyof Viewport, MediaQueryList>;

    updateSnapshot();

    Object.values(mediaQueries).forEach((mediaQuery) => {
      mediaQuery.addEventListener("change", updateSnapshot);
    });
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && mediaQueries) {
      Object.values(mediaQueries).forEach((mediaQuery) => {
        mediaQuery.removeEventListener("change", updateSnapshot);
      });

      mediaQueries = null;
    }
  };
};

const getSnapshot = () => snapshot;

const getServerSnapshot = () => SERVER_VIEWPORT;

export const useViewport = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
