import { persist } from "zustand/middleware";
import { createStore } from "zustand";

export interface GoalState {
  currentGoalId: number | null;
}
export interface GoalActions {
  setGoalId: (id: number | null) => void;
  resetGoalId: () => void;
}

export type GoalStore = GoalState & GoalActions;

export const createGoalStore = (initState: GoalState = { currentGoalId: null }) => {
  return createStore<GoalStore>()(
    persist(
      (set) => ({
        ...initState,
        setGoalId: (id) => set({ currentGoalId: id }),
        resetGoalId: () => set({ currentGoalId: null }),
      }),
      { name: "recent-goal-storage", partialize: (state) => ({ currentGoalId: state.currentGoalId }) },
    ),
  );
};

export type GoalStoreApi = ReturnType<typeof createGoalStore>;
