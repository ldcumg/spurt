import MetaSection from "./MetaSection";
import { Calendar } from "@/assets/icons";

interface CreatedAtSectionProps {
  createdAt: string;
}

/** 노트의 작성일을 표시하는 영역이다. */
export default function CreatedAtSection({ createdAt }: CreatedAtSectionProps) {
  return (
    <MetaSection
      icon={<Calendar className="size-20" />}
      title="작성일"
    >
      <time className="text-body-md block rounded-lg bg-neutral-50 px-16 py-12 text-neutral-600">{createdAt}</time>
    </MetaSection>
  );
}
