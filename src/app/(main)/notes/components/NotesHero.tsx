import { Plus, Search } from "@/assets/icons";
import infoImage from "@/assets/images/notepage/notepage_info_image.png";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { twMerge } from "@/lib/twMerge";
import Image from "next/image";

interface NewNoteButtonProps {
  onClick: () => void;
  compact?: boolean;
  className?: string;
}

function NewNoteButton({ onClick, compact = false, className }: NewNoteButtonProps) {
  return (
    <Button
      type="button"
      size={compact ? "lg" : "xl"}
      onClick={onClick}
      className={twMerge("text-title-xs inline-flex shrink-0 items-center justify-center gap-8", className)}
    >
      <Plus className="size-20" />새 노트
    </Button>
  );
}

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <div className="relative min-w-0 flex-1 [&_input]:pl-48">
      <Search className="pointer-events-none absolute top-1/2 left-16 z-10 size-20 -translate-y-1/2 text-neutral-600" />
      <TextInput
        aria-label="노트 검색"
        value={value}
        placeholder="노트 제목, 내용, 할 일, 목표로 검색해보세요."
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

interface NotesHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewNote: () => void;
}

/** 노트 페이지의 제목, 소개 이미지, 검색과 새 노트 동작을 보여 준다. */
export default function NotesHero({ searchTerm, onSearchChange, onNewNote }: NotesHeroProps) {
  return (
    <section className="relative mb-24 md:mb-32 md:min-h-248 xl:min-h-224">
      <div className="max-w-680 md:pr-280 xl:max-w-600 xl:pr-0">
        <p className="text-body-md mb-4 hidden font-semibold text-neutral-700 md:block">노트</p>
        <div className="flex items-start justify-between gap-16">
          <div>
            <h1 className="text-title-lg text-foreground-title md:text-display">노트 모아보기</h1>
            <p className="text-body-md md:text-body-lg mt-8 max-w-560 text-neutral-600">
              각 할 일에서 정리한 노트를 한눈에 확인하고, 다시 성장의 재료로 활용해보세요.
            </p>
          </div>
          <NewNoteButton
            compact
            onClick={onNewNote}
            className="md:hidden"
          />
        </div>
      </div>

      <Image
        src={infoImage}
        alt="기록하는 내가 조금씩 더 성장하고 있어요"
        priority
        className="mt-12 ml-auto h-auto w-240 md:absolute md:top-0 md:right-0 md:mt-0 md:w-280 xl:top-64 xl:w-320"
      />

      <div
        aria-label="노트 검색"
        className="mt-24 flex items-center gap-12 md:absolute md:bottom-0 md:left-0 md:mt-0 md:w-full xl:top-0 xl:right-0 xl:bottom-auto xl:left-auto xl:w-640"
      >
        <SearchField
          value={searchTerm}
          onChange={onSearchChange}
        />
        <NewNoteButton
          onClick={onNewNote}
          className="hidden md:inline-flex"
        />
      </div>
    </section>
  );
}
