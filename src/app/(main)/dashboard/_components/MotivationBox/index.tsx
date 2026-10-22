import { Plus } from "@/assets/icons/index";
import { MotiveSprout } from "@/assets/images/dashboardpage";
import Button from "@/components/ui/Button";
import TodoFormTrigger from "@/components/ui/TodoFormTrigger";

export default function MotivationBox() {
  return (
    <div className="bg-primary-100 flex flex-row justify-between rounded-md p-20 shadow-sm">
      <div className="flex flex-col justify-between gap-10">
        <div>
          <p className="text-title-md">지금까지 정말 잘하고 있어요!</p>
          <p className="text-body-lg text-neutral-500">작은 반복이 큰 변화를 만들어요.</p>
        </div>
        <TodoFormTrigger
          renderItem={(todoFormOpen) => (
            <Button
              onClick={todoFormOpen}
              variant={"outline"}
              size={"xl"}
              className="flex max-w-150 items-center justify-center gap-10 rounded-full bg-white py-20 shadow-sm"
            >
              <Plus className="size-16 shrink-0" />
              <p className="text-title-xs truncate leading-none">새 할 일 추가</p>
            </Button>
          )}
        />
      </div>
      <MotiveSprout className="flex size-150 shrink-0 sm:hidden lg:flex" />
    </div>
  );
}
