"use client";

import { createGoalStore, GoalStoreApi } from "@/hooks/state/goal/createGoalStore";
import { createContext, ReactNode, useState } from "react";

export const GoalStoreContext = createContext<GoalStoreApi | undefined>(undefined);

export interface GoalStoreProviderProps {
  children: ReactNode;
}

export function GoalStoreProvider({ children }: GoalStoreProviderProps) {
  const [store] = useState(() => createGoalStore());

  return <GoalStoreContext.Provider value={store}>{children}</GoalStoreContext.Provider>;
}
