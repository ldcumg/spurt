import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { dataSet } from "../../../app/(main)/dashboard/_components/types";

interface GraphBoxProps {
  dataSet: dataSet[];
  weeklyTotalCount: number;
}
export default function GraphBox({ dataSet, weeklyTotalCount }: GraphBoxProps) {
  return (
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
          이번 주 총 <span className="text-title-sm text-primary-700">{weeklyTotalCount} </span>
          완료
        </p>
      </div>
    </div>
  );
}
