<<<<<<< HEAD
"use client";
import Button from "@/components/ui/Button";
import GoalCard from "@/components/ui/GoalCard";
import { Goal, Todos } from "@/components/ui/GoalCard/mock";

import ProgressRing from "@/components/ui/ProgressRing";

export default function HomePage() {
  return (
    <div>
      <GoalCard
        goal={Goal.goals[0]}
        todo={Todos.todos[0]}
      />
    </div>
  );
=======
export default function HomePage() {
  return <></>;
>>>>>>> 4e88483217f868813a350233bc519368d5731d92
}
