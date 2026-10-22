import { TodoResponse } from "@/types/todos.types";
import GoalTodoBox from "./GoalTodoBox";
import { GoalListItem } from "@/types/goals.types";

interface GoalBodyProps {
  goal: GoalListItem;
  todosList: TodoResponse[];
  donesList: TodoResponse[];
  handleToggleTodo: (id: number) => void;
  isTodoLoading: boolean;
}

export default function GoalBody({ goal, todosList, donesList, handleToggleTodo, isTodoLoading }: GoalBodyProps) {
  return (
    <section className="flex flex-1 flex-col gap-24 lg:flex-row">
      <GoalTodoBox
        variant="todo"
        list={todosList}
        goal={goal}
        handleToggleTodo={handleToggleTodo}
        isLoading={isTodoLoading}
      />
      <GoalTodoBox
        variant="done"
        list={donesList}
        goal={goal}
        handleToggleTodo={handleToggleTodo}
        isLoading={isTodoLoading}
      />
    </section>
  );
}
