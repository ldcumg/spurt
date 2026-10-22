import { GoalListItem } from "@/types/goals.types";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { createStore } from "zustand";

export interface GoalState {
  currentGoalId: number | null;
  goalList: GoalListItem[];
}
export interface GoalActions {
  setGoalId: (id: number | null) => void;
  resetGoalId: () => void;
}
export type GoalStore = GoalState & GoalActions;

export interface GoalStoreOwner {
  teamId: string;
  userId: number;
}

const noOpStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const createGoalStore = (
  owner: GoalStoreOwner | null,
  initState: GoalState = { currentGoalId: null, goalList: [] },
) => {
  return createStore<GoalStore>()(
    persist(
      (set) => ({
        ...initState,
        setGoalId: (id) => set({ currentGoalId: id }),
        resetGoalId: () => set({ currentGoalId: null }),
      }),
      {
        name: owner
          ? `recent-goal-storage:${encodeURIComponent(owner.teamId)}:${owner.userId}`
          : "recent-goal-storage:unresolved",
        storage: owner ? undefined : createJSONStorage(() => noOpStorage),
        partialize: (state) => ({ currentGoalId: state.currentGoalId }),
      },
    ),
  );
};

export type GoalStoreApi = ReturnType<typeof createGoalStore>;
