import { FlagFilled, More, Plus, Right } from "@/assets/icons/index";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressRing from "@/components/ui/ProgressRing";
import { Todos, MockGoalList, MockGoalDetail } from "@/components/ui/GoalCard/mock";
import TodoItem from "@/components/ui/TodoItem";

export default function GoalPage() {
  return (
    <div className="bg-primary-50 flex h-screen flex-col gap-20 p-24 pt-32">
      <header>
        <p className="text-display">체다치즈님의 목표</p>
      </header>
      <section>
        <div className="flex h-160 flex-row gap-12">
          <div className="flex flex-2 flex-row items-center justify-between gap-8 rounded-md bg-white p-20 shadow-sm">
            <div className="flex flex-row items-center justify-center gap-8">
              <div className="bg-primary-100 flex size-64 items-center justify-center rounded-full">
                <FlagFilled className="text-primary-600 size-32" />
              </div>
              <p className="text-title-md">자바스크립트로 웹 서비스 만들기</p>
            </div>
            <More className="size-32" />
          </div>
          <div className="bg-primary-200 flex flex-1 flex-row items-center justify-between gap-24 rounded-md p-20 shadow-sm">
            <ProgressRing
              totalCount={100}
              doneCount={64}
            />
            <div className="w-full">
              <p className="text-title-xs text-primary-700">목표 진행도</p>
              <p className="text-title-md text-primary-700">
                <span className="text-display text-primary-700">64</span>%
              </p>
            </div>
          </div>
          <div className="bg-primary-100 flex flex-1 flex-row items-end gap-12 rounded-md p-20 shadow-sm">
            <p className="text-title-md">노트 모아보기</p>
            <Right className="size-32 shrink-0" />
          </div>
        </div>
      </section>
      <section className="flex h-full flex-row gap-24">
        <div className="flex-1 rounded-md bg-white p-12 shadow-sm">
          <div className="flex flex-row items-center justify-between p-8">
            <Badge type="todo" />
            <Button
              variant={"outline"}
              className="flex flex-row items-center justify-center gap-8 rounded-full"
            >
              <Plus className="size-16 shrink-0" />
              <p>할 일 추가</p>
            </Button>
          </div>
          <div>
            {Todos.todos ? (
              [...Todos.todos]
                .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                .slice(0, 3)
                .map((item) => (
                  <TodoItem
                    key={item.id}
                    todo={item}
                  />
                ))
            ) : (
              <p>
                최근 등록한 할 일이 없어요
                <br />할 일을 등록해 보세요.
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-12 shadow-sm">
          <div className="flex flex-row items-center justify-between p-8">
            <Badge type="done" />
          </div>
          <div>
            {Todos.todos ? (
              [...Todos.todos]
                .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                .slice(0, 3)
                .map((item) => (
                  <TodoItem
                    key={item.id}
                    todo={item}
                  />
                ))
            ) : (
              <p>
                최근 등록한 할 일이 없어요
                <br />할 일을 등록해 보세요.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
