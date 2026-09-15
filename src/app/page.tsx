import Button from "@/components/ui/Button";
import GoalCard from "@/components/ui/GoalCard";
import { Goal, Todos } from "@/components/ui/GoalCard/mock";
import ProgressBar from "@/components/ui/ProgessBar";
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
}
