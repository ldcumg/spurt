import { BarChart, Bar, ResponsiveContainer, LabelList, YAxis, CartesianGrid, XAxis } from "recharts";

import { Right, Plus } from "@/assets/icons/index";
import Button from "@/components/ui/Button";
import GoalCard from "@/components/ui/GoalCard";
import ProgressRing from "@/components/ui/ProgressRing";
import TodoItem from "@/components/ui/TodoItem";

import { MockGoalList, Todos } from "@/components/ui/GoalCard/mock";
import getDoneByDate from "@/utils/getDoneByDate";

type dataSet = {
  date: string;
  count: number;
};

export default function DashboardPage() {
  const data = getDoneByDate(Todos.todos);
  const dataSet: dataSet[] = data.map((item) => ({ date: item.date, count: item.count }));

  const doneCount = Todos.todos.filter((todo) => todo.done).length;
  /**
   * array.reduce((누적값, 현재요소) => {
        return 다음누적값;
      }, 초기값);
   */
  const weeklyTotal = dataSet.reduce((total, item) => total + item.count, 0);

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
      {/**1열 */}
      <section className="flex flex-col gap-20">
        <div className="bg-primary-100 flex flex-col gap-10 rounded-md p-20 shadow-sm">
          <p className="text-title-md leading-none">지금까지 정말 잘하고 있어요!</p>
          <p className="text-body-lg text-neutral-500">작은 반복이 큰 변화를 만들어요.</p>
          <Button
            variant={"outline"}
            className="flex max-w-150 items-center justify-center gap-10 rounded-full bg-white py-20 shadow-sm"
          >
            <Plus className="size-16 shrink-0" />
            <p className="text-title-xs leading-none">새 할 일 추가</p>
          </Button>
        </div>
        <div className="flex flex-col gap-10 rounded-md bg-white p-20 shadow-sm">
          <p className="text-title-md">전체 진행 상황</p>
          <div className="flex flex-col gap-16 md:flex-row">
            <ProgressRing
              doneCount={doneCount}
              totalCount={Todos.totalCount}
              className="flex-1"
            />
            <div className="flex flex-1 justify-between gap-15">
              <div className="bg-primary-50 flex w-full flex-row gap-10 rounded-md p-16">
                <div className="bg-primary-600 h-16 w-16 rounded-full"></div>
                <div className="flex flex-col justify-between">
                  <p className="text-title-xs leading-none text-neutral-500">완료한 할 일</p>
                  <p className="text-title-md md:text-display">{doneCount}</p>
                </div>
              </div>
              <div className="flex w-full flex-row gap-10 rounded-md bg-neutral-100 p-16">
                <div className="h-16 w-16 rounded-full bg-neutral-600"></div>
                <div className="flex flex-col justify-between">
                  <p className="text-title-xs leading-none text-neutral-500">전체 할 일</p>
                  <p className="text-title-md md:text-display">{Todos.totalCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/**2열 */}
      <section className="flex flex-col gap-20">
        <div className="flex flex-col rounded-md bg-white px-20 py-10 shadow-sm">
          <div className="flex flex-row items-center justify-between border-b">
            <p className="text-title-md">최근 등록한 할 일</p>
            <div className="text-body-xs flex flex-row gap-5 leading-none">
              모두 보기
              <Right className="h-16 w-16 shrink-0" />
            </div>
          </div>
          {/** 최근 등록한 할 일을 3개까지 보여줌
           * - 최근 등록한 할 일이 없는 경우 방어
           */}
          {Todos.todos.length > 0 ? (
            [...Todos.todos]
              .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
              .slice(0, 3)
              .map((item) => (
                <TodoItem
                  key={item.id}
                  todo={item}
                  type="goal"
                />
              ))
          ) : (
            <p>
              최근 등록한 할 일이 없어요
              <br />할 일을 등록해 보세요.
            </p>
          )}
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
              이번 주 총 <span className="text-title-sm text-primary-700">{weeklyTotal} </span>
              완료
            </p>
          </div>
        </div>
      </section>
      {/**3열 */}
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
        <div className="flex flex-col gap-10 md:grid md:grid-cols-2 lg:grid-cols-3">
          {MockGoalList.goals.length > 0 ? (
            [...MockGoalList.goals]
              .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
              .slice(0, 3)
              .map((item) => {
                const matchedTodos = Todos.todos.filter((todo) => todo.goalId === item.id);
                return (
                  <GoalCard
                    key={item.id}
                    goal={item}
                    todos={Todos.todos.filter((todo) => todo.goalId === item.id)}
                  />
                );
              })
          ) : (
            <p className="text-center text-neutral-400">등록된 목표가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
