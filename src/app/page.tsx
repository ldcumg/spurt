import Button from "@/components/ui/Button";
<<<<<<< HEAD
import GoalCard from "@/components/ui/GoalCard";
import { Goal, Todos } from "@/components/ui/GoalCard/mock";
import ProgressBar from "@/components/ui/ProgessBar";
=======
import ProgressBar from "@/components/ui/ProgressBar";
>>>>>>> f0dbcc6d0452841da76b4be46a6e15bde6b05d6b
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
