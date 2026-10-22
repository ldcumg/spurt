"use client";

import { useContext } from "react";
import { GoalStore } from "./createGoalStore";
import { GoalStoreContext } from "@/contexts/GoalStoreContext";
import { useStore } from "zustand";

export const useGoalContext = <T>(selector: (state: GoalStore) => T): T => {
  const store = useContext(GoalStoreContext);

  if (!store) {
    throw new Error("useGoalContext는 GoalStoreProvider 내부에서만 호출할 수 있습니다.");
  }

  return useStore(store, selector);
};
