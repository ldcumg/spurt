import { Flag, Todos } from "@/assets/icons";
import Button from "@/components/ui/Button";

export default function ActionSection() {
  return (
    <div className="flex gap-8">
      <Button
        variant="primary"
        size="square"
        className="text-body-md aspect-square h-auto flex-1 font-semibold"
      >
        <div className="flex flex-col items-center gap-4">
          <Flag className="size-24 shrink-0" />새 목표
        </div>
      </Button>
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
