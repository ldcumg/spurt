"use client";
import Button from "@/components/ui/Button";
import GoalCard from "@/components/ui/GoalCard";
import { Goal, Todos } from "@/components/ui/GoalCard/mock";

import ProgressRing from "@/components/ui/ProgressRing";
import DashBoardPage from "@/pages/DashBoard/page";

export default function HomePage() {
  return (
    <div>
      <DashBoardPage />
    </div>
  );
}
