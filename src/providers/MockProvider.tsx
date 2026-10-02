"use client";

import { environment } from "@/config/env";
import { useState, useEffect } from "react";

interface MockProviderProps {
  children: React.ReactNode;
}

export function MockProvider({ children }: MockProviderProps) {
  const [isReady, setIsReady] = useState(!environment.isDevelopment);

  useEffect(() => {
    if (!environment.isDevelopment) {
      return;
    }

    import("@/mocks/browser")
      .then(({ mockWorker }) => mockWorker.start())
      .then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return null;
  }

  return children;
}
