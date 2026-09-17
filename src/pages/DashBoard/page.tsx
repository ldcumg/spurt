import { Right, Done, Link, Note, Upload, Plus, FlagFilled, Todo } from "@/assets/icons/index";
import Button from "@/components/ui/Button";
import GoalCard from "@/components/ui/GoalCard";
import ProgressRing from "@/components/ui/ProgressRing";

import { Goal, Todos } from "@/components/ui/GoalCard/mock";

export default function DashBoardPage() {
  return (
    <div className="mx-auto flex w-screen flex-col gap-10 px-30 py-40">
      <div className="p-20">
        <p className="text-display">
          좋은 하루에요,
          <br />
          체다치즈님!👋
        </p>
        <p className="text-title-xs text-neutral-500">오늘도 당신의 목표를 향해 한 걸음 더 나아가요.</p>
      </div>
      <section className="flex flex-col gap-20">
        <div className="bg-primary-100 flex flex-col gap-10 rounded-md p-20 shadow-sm">
          <p className="text-title-md leading-none">지금까지 정말 잘하고 있어요!</p>
          <p className="text-body-lg text-neutral-500">작은 반복이 큰 변화를 만들어요.</p>
          <Button
            variant={"outline"}
            className="flex max-w-150 items-center justify-center gap-10 rounded-full bg-white py-20 shadow-sm"
          >
            <Plus className="h-16 w-16" />
            <p className="text-title-xs leading-none">새 할 일 추가</p>
          </Button>
        </div>
        <div className="flex flex-col gap-10 rounded-md bg-white p-20 shadow-sm">
          <p className="text-title-md">전체 진행 상황</p>
          <ProgressRing
            doneCount={34}
            totalCount={50}
          />
          <div className="flex justify-between gap-15">
            <div className="bg-primary-50 flex w-full flex-row gap-10 rounded-md p-10">
              <div className="bg-primary-600 h-16 w-16 rounded-full"></div>
              <div className="">
                <p className="text-title-xs leading-none text-neutral-500">완료한 할 일</p>
                <p className="text-title-md">34개</p>
              </div>
            </div>
            <div className="flex w-full flex-row gap-10 rounded-md bg-neutral-100 p-10">
              <div className="h-16 w-16 rounded-full bg-neutral-600"></div>
              <div>
                <p className="text-title-xs leading-none text-neutral-500">전체 할 일</p>
                <p className="text-title-md">50개</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-md bg-white px-20 py-10 shadow-sm">
          <div className="flex flex-row items-center justify-between border-b">
            <p className="text-title-md">최근 등록한 할 일</p>
            <div className="text-body-xs flex flex-row gap-5 leading-none">
              모두 보기
              <Right className="h-16 w-16 shrink-0" />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-10">
              <Done className="h-32 w-32 shrink-0" />
              <div className="flex flex-col">
                <p className="text-title-xs">데이터베이스 기출문제 풀기</p>
                <div className="flex flex-row items-center gap-5">
                  <FlagFilled className="h-16 w-16 shrink-0" />
                  <p className="text-body-sm">데이터베이스 기출문제 풀기</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-10">
              <Link />
              <Note />
              <Upload />
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-md bg-white px-20 py-10 shadow-sm">
          <div className="flex flex-row justify-between">
            <p className="text-title-md">일별 완료한 할 일</p>
            <p>이번 주·단위: 개</p>
          </div>
          <div>
            <span>이번 주</span>
            <span> 총</span>
            <span> 25개</span>
            <span> 완료</span>
          </div>
        </div>
        <div className="flex flex-row justify-between px-20">
          <p className="text-title-md">목표별 할 일</p>
          <div className="flex flex-row items-center gap-20">
            <Button
              variant={"outline"}
              className="flex flex-row items-center justify-center gap-10 rounded-full bg-white"
            >
              <Plus className="h-16 w-16 shrink-0" />
              목표 추가
            </Button>
            <p className="text-title-xs">더보기</p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <GoalCard
            goal={Goal.goals[0]}
            todos={Todos.todos}
          />
          <GoalCard
            goal={Goal.goals[0]}
            todos={Todos.todos}
          />
          <GoalCard
            goal={Goal.goals[0]}
            todos={Todos.todos}
          />
        </div>
      </section>
    </div>
  );
}
