import { FlagFilled, More } from "@/assets/icons/index";
import { ReactNode } from "react";

interface GoalTitleProps {
  children: ReactNode | string;
}
export default function GoalTitle({ children }: GoalTitleProps) {
  return (
    <div className="col-span-2 flex flex-2 flex-row items-center justify-between gap-8 rounded-md bg-white p-20 shadow-sm">
      <div className="flex flex-row items-center justify-center gap-16">
        <div className="bg-primary-100 flex size-64 shrink-0 items-center justify-center rounded-full">
          <FlagFilled className="text-primary-600 size-32" />
        </div>
        <p className="text-title-md">{children}</p>
      </div>
      <More className="size-32" />
    </div>
  );
}
