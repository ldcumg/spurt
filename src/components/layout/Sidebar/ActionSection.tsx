"use client";

import { Flag, Todos } from "@/assets/icons/index";
import AddGoalTrigger from "@/components/addGoal/AddGoalTrigger";
import Button from "@/components/ui/Button";
import TodoFormTrigger from "@/components/ui/TodoFormTrigger";

export default function ActionSection() {
  // 로그가 많이 찍혀 주석처리 합니다 - 유진
  //console.log("ActionSection Imports:", { Flag, Todos, AddGoalTrigger, Button });

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

      <TodoFormTrigger
        renderItem={(todoFormOpen) => (
          <Button
            onClick={todoFormOpen}
            variant="outline"
            size="square"
            className="text-body-md aspect-square h-auto flex-1 font-semibold"
          >
            <div className="flex flex-col items-center gap-4">
              <Todos className="size-24 shrink-0" />새 할일
            </div>
          </Button>
        )}
      />
    </div>
  );
}
