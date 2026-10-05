import { Flag } from "@/assets/icons";

export default function TodoInfo() {
  return (
    <div>
      <div className="flxe-row flex">
        <span className="flex items-center">
          <Flag className="size-18" />
          목표
        </span>
        {/* TODO - 구현 */}
        <span>목표 본문</span>
      </div>
    </div>
  );
}
