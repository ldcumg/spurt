import { Plus } from "@/assets/icons/index";
import AddTodoTrigger from "@/components/addTodo/AddTodoTrigger";
import Button from "@/components/ui/Button";

export default function MotivationBox() {
  return (
    <div className="bg-primary-100 flex flex-col gap-10 rounded-md p-20 shadow-sm">
      <p className="text-title-md leading-none">지금까지 정말 잘하고 있어요!</p>
      <p className="text-body-lg text-neutral-500">작은 반복이 큰 변화를 만들어요.</p>
      <AddTodoTrigger
        renderItem={(addTodoOpen) => (
          <Button
            onClick={addTodoOpen}
            variant={"outline"}
            className="flex max-w-150 items-center justify-center gap-10 rounded-full bg-white py-20 shadow-sm"
          >
            <Plus className="size-16 shrink-0" />
            <p className="text-title-xs leading-none">새 할 일 추가</p>
          </Button>
        )}
      />
    </div>
  );
}
