"use client";

import { useUserQuery } from "@/hooks/queries/user/useUserQueries";
import { createGoalStore } from "@/hooks/state/goal/createGoalStore";
import type { GoalStoreApi, GoalStoreOwner } from "@/hooks/state/goal/createGoalStore";
import { createContext, ReactNode, useState } from "react";

export const GoalStoreContext = createContext<GoalStoreApi | undefined>(undefined);

export interface GoalStoreProviderProps {
  children: ReactNode;
}

interface GoalStoreInstanceProps extends GoalStoreProviderProps {
  owner: GoalStoreOwner | null;
}

function GoalStoreInstance({ children, owner }: GoalStoreInstanceProps) {
  const [store] = useState(() => createGoalStore(owner));

  return <GoalStoreContext.Provider value={store}>{children}</GoalStoreContext.Provider>;
}

export function GoalStoreProvider({ children }: GoalStoreProviderProps) {
  const { data: user, error, isPending, refetch } = useUserQuery();
  const owner = user ? { teamId: user.teamId, userId: user.id } : null;
  const ownerKey = owner ? `${encodeURIComponent(owner.teamId)}:${owner.userId}` : "unresolved";

  return (
    <>
      {error && !isPending && (
        <div className="bg-red-100 px-16 py-8 text-red-800" role="alert">
          사용자 정보를 불러오지 못했습니다. <button onClick={() => void refetch()}>다시 시도</button>
        </div>
      )}
      <GoalStoreInstance key={ownerKey} owner={owner}>
        {children}
      </GoalStoreInstance>
    </>
  );
}
