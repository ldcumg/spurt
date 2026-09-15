import { FlagFilled, More } from "@/assets/icons/index";
import flagfilled from "@/assets/icons/Flag_filled.svg";
import ProgressBar from "../ProgessBar";
import Button from "../Button";

{
  /**
    1. 아이콘 완성되면 추가하기
    2. Badge 머지되면 교체하기
    3. props 넘길 수 있게 하기
*/
}

export default function GoalCard() {
  return (
    <div className="flex max-w-[400px] flex-col gap-20 rounded-[20px] bg-white p-24">
      <div className="flex flex-col gap-12">
        <div className="flex justify-between">
          <div className="fles-row flex gap-12">
            <img src={FlagFilled} />
            <p>정보처리기사 합격하기</p>
          </div>
          <img src={More} />
        </div>

        <ProgressBar percentage={64}></ProgressBar>
        <div className="flex flex-row gap-12">
          <div>ToDo</div>
          <div>Done</div>
        </div>
      </div>
      {/* 할 일 목록 */}
      <div className="flex flex-col gap-8 py-8">
        <div className="flex flex-row items-center gap-8">
          <div className="h-12 w-12 bg-white"></div>
          <p className="truncate">데이터베이스 기출풀기 데이터베이스 기출풀기 데이터베이스 기출풀기</p>
        </div>
        <div className="flex flex-row items-center gap-8">
          <div className="h-12 w-12 bg-white"></div>
          <p className="truncate">데이터베이스 기출풀기 데이터베이스 기출풀기 데이터베이스 기출풀기</p>
        </div>
        <div className="flex flex-row items-center gap-8">
          <div className="h-12 w-12 bg-white"></div>
          <p className="truncate">데이터베이스 기출풀기 데이터베이스 기출풀기 데이터베이스 기출풀기</p>
        </div>
      </div>
      <Button
        variant={"outline"}
        size={"lg"}
        className="border-primary-500 text-primary-600 w-full bg-white"
      >
        + 할 일 추가
      </Button>
    </div>
  );
}
