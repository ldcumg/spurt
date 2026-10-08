import { Flag, Todos } from "@/assets/icons/index";
import AddGoalTrigger from "@/components/addGoal/AddGoalTrigger";
import Button from "@/components/ui/Button";

export default function ActionSection() {
  console.log("ActionSection Imports:", { Flag, Todos, AddGoalTrigger, Button });
  return (
    <div className="flex gap-8">
      <AddGoalTrigger>
        <Button
          variant="primary"
          size="square"
          className="text-body-md aspect-square h-auto flex-1 font-semibold"
        >
          <div className="flex flex-col items-center gap-4">
            <Flag className="size-24 shrink-0" />새 목표
          </div>
        </Button>
      </AddGoalTrigger>
      <Button
        variant="outline"
        size="square"
        className="text-body-md aspect-square h-auto flex-1 font-semibold"
      >
        <div className="flex flex-col items-center gap-4">
          <Todos className="size-24 shrink-0" />새 할일
        </div>
      </Button>
    </div>
  );
}
