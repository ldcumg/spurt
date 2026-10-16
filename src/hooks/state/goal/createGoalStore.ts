import { GoalListItem } from "@/types/goals.types";
import { persist } from "zustand/middleware";
import { createStore } from "zustand";

export interface GoalState {
  currentGoalId: number | null;
  goalList: GoalListItem[];
}
export interface GoalActions {
  setGoalId: (id: number) => void;
  setGoalList: (goals: GoalListItem[]) => void;
  onGoalAdded: (newGoal: GoalListItem) => void;
  onGoalUpdated: (updatedGoal: Pick<GoalListItem, "id" | "title">) => void;
  onGoalDeleted: (deletedId: number, remainingGoals: GoalListItem[]) => number | null;
  resetGoalId: () => void;
}

export type GoalStore = GoalState & GoalActions;

export const createGoalStore = (initState: GoalState = { currentGoalId: null, goalList: [] }) => {
  return createStore<GoalStore>()(
    persist(
      (set, get) => ({
        ...initState,
        setGoalId: (id) => set({ currentGoalId: id }),

        setGoalList: (goals) => set({ goalList: goals }),

        onGoalAdded: (newGoal: GoalListItem) => {
          set((state) => ({
            goalList: [newGoal, ...state.goalList],
            currentGoalId: newGoal.id,
          }));
        },

        onGoalUpdated: (updatedGoal) => {
          set((state) => ({
            goalList: state.goalList.map((g) => (g.id === updatedGoal.id ? { ...g, title: updatedGoal.title } : g)),
          }));
        },

        onGoalDeleted: (deletedId) => {
          const { currentGoalId, goalList } = get();
          const nextList = goalList.filter((g) => g.id !== deletedId);

          let nextId = currentGoalId;
          if (currentGoalId === deletedId) {
            nextId = nextList.length > 0 ? nextList[0].id : null;
          }

          set({
            goalList: nextList,
            currentGoalId: nextId,
          });

          return nextId;
        },

        resetGoalId: () => set({ currentGoalId: null }),
      }),
      { name: "recent-goal-storage", partialize: (state) => ({ currentGoalId: state.currentGoalId }) },
    ),
  );
};

export type GoalStoreApi = ReturnType<typeof createGoalStore>;
