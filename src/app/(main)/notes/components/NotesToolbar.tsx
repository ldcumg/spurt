import Select, { type SelectOption } from "@/components/ui/Select";

export type SortOrder = "recent" | "oldest";

const SORT_OPTIONS: SelectOption[] = [
  { value: "recent", label: "최신순" },
  { value: "oldest", label: "오래된순" },
];

interface NotesToolbarProps {
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
}

/** 노트 목록에 적용할 정렬 방식을 선택한다. */
export default function NotesToolbar({ sortOrder, onSortOrderChange }: NotesToolbarProps) {
  return (
    <section
      aria-label="노트 정렬"
      className="mb-24 flex justify-end md:mb-32"
    >
      <Select
        label="정렬 순서"
        options={SORT_OPTIONS}
        value={sortOrder}
        onChange={(value) => onSortOrderChange(value as SortOrder)}
      />
    </section>
  );
}
