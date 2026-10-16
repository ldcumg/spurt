import { Right } from "@/assets/icons/index";
import Link from "next/link";
import GoalProgress from "./GoalProgress";
import { GoalListItem } from "@/types/goals.types";
import GoalTitle from "./GoalTitle";

interface GoalHeaderProps {
  goal: GoalListItem;
  goalList: GoalListItem[];
  totalCount: number;
  doneCount: number;
  percentage: number;
  onSelectGoal?: (goalId: string) => void;
  onAddGoal?: (newTitle: string) => void;
  onUpdateTitle?: (newTitle: string) => void;
}

export default function GoalHeader({
  goal,
  goalList,
  totalCount,
  doneCount,
  percentage,
  onSelectGoal,
  onAddGoal,
  onUpdateTitle,
}: GoalHeaderProps) {
  return (
    <section>
      <div className="grid h-auto grid-cols-2 gap-12 lg:flex lg:flex-row">
        <GoalTitle
          goal={goal}
          goalList={goalList}
          onSelectGoal={onSelectGoal}
          onAddGoal={onAddGoal}
          onUpdateTitle={onUpdateTitle}
        />
        <GoalProgress
          totalCount={totalCount}
          doneCount={doneCount}
          percentage={percentage}
        />
        <div className="bg-primary-100 flex flex-1 flex-row items-end gap-12 rounded-md p-20 shadow-sm">
          <p className="text-title-md text-nowrap">
            노트 <br />
            모아보기
          </p>
          <Link href={"/notes"}>
            <Right className="size-32 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
