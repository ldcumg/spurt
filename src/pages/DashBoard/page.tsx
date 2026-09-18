import { BarChart, Bar, ResponsiveContainer, LabelList, YAxis, CartesianGrid, XAxis } from "recharts";

import { Right, Done, Link, Note, Upload, Plus, FlagFilled, Todo } from "@/assets/icons/index";
import Button from "@/components/ui/Button";
import GoalCard from "@/components/ui/GoalCard";
import ProgressRing from "@/components/ui/ProgressRing";

import { Goal, Todos } from "@/components/ui/GoalCard/mock";
import getDoneByDate, { DailyDoneStat } from "@/utils/getDoneByDate";
import DashTodoItem from "../../components/ui/DashTodoItem";

type dataSet = {
  date: string;
  count: number;
};

export default function DashBoardPage() {
  const data = getDoneByDate(Todos.todos);
  const dataSet: dataSet[] = data.map((item) => ({ date: item.date, count: item.count }));

  return (
    <div className="mx-auto flex w-screen flex-col gap-20 px-30 py-40">
      <header className="p-20">
        <p className="text-display">
          좋은 하루에요,
          <br />
          체다치즈님!👋
        </p>
        <p className="text-title-xs text-neutral-500">오늘도 당신의 목표를 향해 한 걸음 더 나아가요.</p>
      </header>
      <section className="flex flex-col gap-20">
        <div className="bg-primary-100 flex flex-col gap-10 rounded-md p-20 shadow-sm">
          <p className="text-title-md leading-none">지금까지 정말 잘하고 있어요!</p>
          <p className="text-body-lg text-neutral-500">작은 반복이 큰 변화를 만들어요.</p>
          <Button
            variant={"outline"}
            className="flex max-w-150 items-center justify-center gap-10 rounded-full bg-white py-20 shadow-sm"
          >
            <Plus
              viewBox="0 0 24 24"
              className="size-16 shrink-0"
            />
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
      </section>
      <section className="flex flex-col gap-20">
        <div className="flex flex-col rounded-md bg-white px-20 py-10 shadow-sm">
          <div className="flex flex-row items-center justify-between border-b">
            <p className="text-title-md">최근 등록한 할 일</p>
            <div className="text-body-xs flex flex-row gap-5 leading-none">
              모두 보기
              <Right
                viewBox="0 0 24 24"
                className="h-16 w-16 shrink-0"
              />
            </div>
          </div>
          {/** 최근 등록한 할 일을 3개까지 보여줌
           * - 최근 등록한 할 일이 없는 경우 방어 필요
           */}
          {Todos.todos.slice(0, 3).map((item) => (
            <DashTodoItem
              key={item.id}
              todo={item}
            />
          ))}
        </div>
        <div className="flex flex-col gap-10 rounded-md bg-white px-20 py-10 shadow-sm">
          <div className="flex flex-row items-center justify-between">
            <p className="text-title-md">일별 완료한 할 일</p>
            <p>이번 주 · 단위: 개</p>
          </div>
          <div>
            {/**Tindy Bar Chart - Recharts 라이브러리 활용 */}
            <ResponsiveContainer
              width="100%"
              height={150}
            >
              <BarChart
                data={dataSet}
                responsive
                style={{ maxHeight: "200px" }}
                margin={{ top: 20, bottom: 0 }}
              >
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                />
                <XAxis
                  dataKey={"date"}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  width="auto"
                  niceTicks="snap125"
                  tickLine={false}
                  axisLine={false}
                />
                <Bar
                  dataKey="count"
                  stroke="#3b9259"
                  strokeWidth={1}
                  radius={[4, 4, 0, 0]}
                  fill="#3b9259"
                >
                  <LabelList
                    dataKey={"count"}
                    position="top"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-primary-50 text-body-md flex h-40 w-full flex-row items-center justify-center rounded-full">
            <p>
              이번 주 총 <span className="text-title-sm text-primary-700">25개 </span>
              완료
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-10">
        <div className="flex flex-row justify-between px-20">
          <p className="text-title-md">목표별 할 일</p>
          <div className="flex flex-row items-center gap-20">
            <Button
              variant={"outline"}
              className="flex flex-row items-center justify-center gap-10 rounded-full bg-white"
            >
              <Plus
                className="h-16 w-16 shrink-0"
                viewBox="0 0 24 24"
              />
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
