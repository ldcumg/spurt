import { Right } from "@/assets/icons/index";
import Link from "next/link";
import GoalProgress from "./GoalProgress";
import { GoalListItem } from "@/types/goals.types";
import GoalTitle from "./GoalTitle";
import NoteImage from "@/assets/images/goalpage/NoteImage.png";
import Image from "next/image";

interface GoalHeaderProps {
  goal: GoalListItem;
  goalList: GoalListItem[];
  totalCount: number;
  doneCount: number;
  percentage: number;
  onSelectGoal?: (goalId: string) => void;
  onAddGoal?: (newTitle: string) => void;
  onUpdateTitle?: (newTitle: string) => void;
  onDeleteGoal?: (goalId: number) => void;
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
  onDeleteGoal,
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
          onDeleteGoal={onDeleteGoal}
        />
        <GoalProgress
          totalCount={totalCount}
          doneCount={doneCount}
          percentage={percentage}
        />
        <Link
          href={"/notes"}
          className="bg-primary-100 flex flex-1 cursor-pointer flex-row justify-between rounded-md p-20 shadow-sm"
        >
          <div className="flex flex-row items-end gap-12">
            <p className="text-title-md text-nowrap">
              노트 <br />
              모아보기
            </p>
            <Right className="size-32 shrink-0" />
          </div>
          <div className="relative hidden shrink-0 lg:block lg:h-80 lg:w-120 xl:h-110 xl:w-185">
            <Image
              src={NoteImage}
              alt="노트 이미지"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
