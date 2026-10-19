import { Plus } from "@/assets/icons";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import TodoItem from "@/components/ui/TodoItem";
import { GoalListItem } from "@/types/goals.types";
import { TodoResponse } from "@/types/todos.types";
import TodoEmpty from "../TodoEmpty";
import AddTodoTrigger from "@/components/addTodo/AddTodoTrigger";

interface GoalTodoBoxProps {
  variant: "todo" | "done";
  list: TodoResponse[];
  goal: GoalListItem;
  handleToggleTodo: (id: number) => void;
}

export default function GoalTodoBox({ variant, list, goal, handleToggleTodo }: GoalTodoBoxProps) {
  return (
    <div className="flex-1 rounded-md bg-white p-12 shadow-sm">
      <div className="flex h-60 flex-row items-center justify-between p-8">
        <Badge
          type={variant}
          className="[&>p]:!block"
        />
        {variant === "todo" && (
          <AddTodoTrigger
            aleadySelectedGoal={goal}
            renderItem={(addTodoOpen) => (
              <Button
                onClick={addTodoOpen}
                variant={"outline"}
                className="flex flex-row items-center justify-center gap-8 rounded-full"
              >
                <Plus className="size-16 shrink-0" />
                <p>할 일 추가</p>
              </Button>
            )}
          />
        )}
      </div>
      <div>
        {/**
         * 목표 상세에서 todo의 타입에 노트와 링크가 없음
         * -> 목표 상세에서 그 역할을 하려면 api 호출이 두번 필요함
         *
         * ==> 할 일 목록 호출해서 goalId 비교하기 !! 로 해결 ~
         */}
        {list.length > 0 ? (
          [...list]
            .filter((item) => item.goalId === goal.id)
            .map((item) => {
              //thisGoal.completedCount++;
              return (
                <TodoItem
                  key={item.id}
                  todo={item}
                  onToggle={handleToggleTodo}
                />
              );
            })
        ) : (
          <TodoEmpty variant={variant} />
        )}
      </div>
    </div>
  );
}
