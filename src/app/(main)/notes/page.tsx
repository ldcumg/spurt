"use client";

import { INITIAL_NOTES, type NoteMock, type NoteTone } from "./mock";
import { Burger, FlagFilled, More, NoteFilled, Plus, Search, Star, StarFilled, Todos, X } from "@/assets/icons";
import infoImage from "@/assets/images/notepage/notepage_info_image.png";
import Sidebar from "@/components/layout/Sidebar";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import Profile from "@/components/ui/Profile";
import Select, { type SelectOption } from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const NOTE_TONE_CLASSES: Record<NoteTone, string> = {
  mint: "bg-mint-light text-mint",
  coral: "bg-coral-light text-coral",
  blue: "bg-blue-light text-blue",
  yellow: "bg-yellow-light text-warning",
};

// 정렬 상태에 들어갈 수 있는 문자열
type SortOrder = "recent" | "oldest";

// 새로 추가: 공용 Select에 전달하는 정렬 옵션이다.
const SORT_OPTIONS: SelectOption[] = [
  { value: "recent", label: "최신순" },
  { value: "oldest", label: "오래된순" },
];

interface NewNoteButtonProps {
  onClick: () => void;
  /** true면 lg크기, false면 xl크기, 기본값은 false */
  compact?: boolean;
  className?: string;
}

/**
 * 공통 Button의 variant와 size를 그대로 사용한다.
 */
function NewNoteButton({ onClick, compact = false, className }: NewNoteButtonProps) {
  return (
    <Button
      type="button"
      // compact가 생략되면 false이므로 기본적으로 xl 크기를 사용한다.
      size={compact ? "lg" : "xl"}
      onClick={onClick}
      // shrink-0은 flex 공간이 부족할 때 버튼 너비가 찌그러지는 것을 막는다.
      // className ?? ""는 className이 undefined일 때 빈 문자열을 넣는 null 병합 연산자다.
      className={twMerge("text-title-xs inline-flex shrink-0 items-center justify-center gap-8", className)}
    >
      <Plus className="size-20" />새 노트
    </Button>
  );
}

interface MobileHeaderProps {
  /** 현재 모바일 메뉴가 열려 있는지 나타낸다. */
  menuOpen: boolean;
  /** 햄버거 버튼을 눌렀을 때 실행할 함수 */
  onMenuClick: () => void;
}

/** 모바일 전용 헤더 */
function MobileHeader({ menuOpen, onMenuClick }: MobileHeaderProps) {
  return (
    // md:hidden은 768px 이상에서 이 헤더 전체를 숨긴다.
    <header className="border-border flex h-72 items-center justify-between border-b bg-white px-16 md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="md"
        className="px-6"
        // 아이콘만 있는 버튼은 스크린 리더가 목적을 알 수 있도록 aria-label이 필요하다.
        aria-label="메뉴 열기"
        // aria-expanded는 이 버튼이 제어하는 메뉴의 현재 열린 상태를 전달한다.
        aria-expanded={menuOpen}
        onClick={onMenuClick}
      >
        <Burger className="size-24" />
      </Button>

      <Logo
        variant="horizontalWithTagline"
        className="h-52"
        // 첫 화면에 바로 보이는 로고이므로 Next Image가 우선 로드하도록 한다.
        priority
      />

      <Profile
        variant="greeting"
        className="w-40"
      />
    </header>
  );
}

interface SearchFieldProps {
  /** 부모가 관리하는 현재 검색어 */
  value: string;
  /** 입력값이 바뀔 때 새 문자열을 부모에게 전달한다. */
  onChange: (value: string) => void;
}

/**
 * 공통 TextInput에 검색 아이콘을 결합한 제어 컴포넌트다.
 * 입력값을 내부 state로 따로 저장하지 않고 value와 onChange를 부모에게서 받는다.
 */
function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    // relative는 내부의 absolute 검색 아이콘이 이 div를 기준으로 배치되게 한다.
    // min-w-0은 flex 자식이 내용 너비보다 작아질 수 있게 해 가로 overflow를 방지한다.
    // [&_input]:pl-48은 "이 요소 아래의 모든 input에 padding-left: 48px"을 적용하는 임의 selector다.
    <div className="relative min-w-0 flex-1 [&_input]:pl-48">
      {/*
        top-1/2와 -translate-y-1/2를 함께 써서 아이콘의 세로 중앙을 맞춘다.
        pointer-events-none은 아이콘이 클릭을 가로채지 않고 input에 포커스가 가도록 한다.
      */}
      <Search className="pointer-events-none absolute top-1/2 left-16 z-10 size-20 -translate-y-1/2 text-neutral-600" />
      <TextInput
        aria-label="노트 검색"
        value={value}
        placeholder="노트 제목, 내용, 할 일, 목표로 검색해보세요."
        // React의 change 이벤트에서 실제 input 문자열만 꺼내 부모 콜백에 넘긴다.
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

// 아래 FilterTab 코드는 필터 UI에서 사용하던 컴포넌트다.
// 사용자가 직접 삭제하기 전까지 이전 구현을 확인할 수 있도록 주석으로 보존한다.
// interface FilterTabProps {
//   // 배열 요소 타입을 직접 다시 만들지 않고 NOTE_FILTERS의 한 항목 타입을 재사용한다.
//   filter: (typeof NOTE_FILTERS)[number];
//   count: number;
//   active: boolean;
//   onClick: () => void;
// }
//
// /** 전체/내 노트/중요/아카이브 중 하나를 선택하는 탭 형태의 버튼 */
// function FilterTab({ filter, count, active, onClick }: FilterTabProps) {
//   return (
//     <Button
//       type="button"
//       variant={active ? "primary" : "outline"}
//       size="lg"
//       // 일반 button을 토글 버튼처럼 사용하므로 선택 상태를 보조 기술에도 알려준다.
//       aria-pressed={active}
//       onClick={onClick}
//       // 모바일에서는 네 버튼을 한 줄에 넣기 위해 caption, 좁은 gap/padding을 사용한다.
//       // md 이상에서는 디자인 토큰 title-xs와 넓은 간격으로 되돌린다.
//       className="text-caption md:text-title-xs inline-flex min-w-0 items-center justify-center gap-4 px-2 font-semibold shadow-sm md:gap-8 md:px-16"
//     >
//       {/* 필터 종류에 의미가 있는 경우에만 아이콘을 표시한다. */}
//       {filter.id === "important" && <StarFilled className="text-warning size-12 md:size-18" />}
//       {filter.id === "archive" && <Temporary className="size-12 md:size-18" />}
//       <span>{filter.label}</span>
//       <span
//         className={`text-caption flex size-16 items-center justify-center rounded-full md:size-24 ${
//           // 선택된 버튼에서는 흰색 배지, 선택되지 않은 버튼에서는 연한 primary 배지를 사용한다.
//           active ? "text-primary-600 bg-white" : "bg-neutral-100 text-neutral-700"
//         }`}
//       >
//         {count}
//       </span>
//     </Button>
//   );
// }

// 네이티브 FilterSelect 구현은 운영체제별 옵션 UI가 달라 공용 Select로 교체했다.
// 기존 코드는 Git 이력에서 확인할 수 있다.

/** 노트 카드에서 목표와 할 일을 같은 모양으로 보여 주는 작은 표시 행 */
function NoteInfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    // min-w-0이 있어야 마지막 value가 부모 너비를 밀어내지 않고 truncate될 수 있다.
    <div className="flex min-w-0 items-center gap-8 rounded-md bg-neutral-50 px-12 py-4">
      {/* 아이콘과 label은 줄어들면 안 되므로 shrink-0을 사용한다. */}
      <span className="shrink-0">{icon}</span>
      <strong className="text-caption shrink-0 text-neutral-800">{label}</strong>
      {/* truncate는 긴 문자열을 한 줄 말줄임표로 처리한다. */}
      <span className="text-body-sm truncate text-neutral-700">{value}</span>
    </div>
  );
}

interface NoteCardProps {
  /** 카드가 표시할 노트 한 건 */
  note: NoteMock;
  /** 중요 상태를 바꿀 노트 id를 부모에게 전달하는 함수 */
  onFavoriteToggle: (id: number) => void;
}

/**
 * article은 목록의 각 노트가 독립적인 콘텐츠라는 의미를 HTML 구조에 전달한다.
 */
function NoteCard({ note, onFavoriteToggle }: NoteCardProps) {
  return (
    <article className="border-border bg-surface-card flex min-w-0 flex-col rounded-xl border p-16 shadow-sm md:p-20">
      <div className="mb-12 flex items-start justify-between gap-12">
        <div className={`flex size-48 shrink-0 items-center justify-center rounded-lg ${NOTE_TONE_CLASSES[note.tone]}`}>
          <NoteFilled className="size-24" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={note.isFavorite ? `${note.title} 중요 해제` : `${note.title} 중요 표시`}
            aria-pressed={note.isFavorite}
            onClick={() => onFavoriteToggle(note.id)}
            className="px-8"
          >
            {/* isFavorite 상태에 따라 채운 별과 빈 별 중 하나만 렌더링한다. */}
            {note.isFavorite ? (
              <StarFilled className="text-warning size-32" />
            ) : (
              <Star className="size-32 text-neutral-500" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={`${note.title} 더보기`}
            className="px-8"
            onClick={() => {}}
          >
            <More className="size-20 text-neutral-500" />
          </Button>
        </div>
      </div>

      {/* line-clamp-1/2는 카드 높이가 지나치게 커지지 않도록 표시 줄 수를 제한한다. */}
      <h2 className="text-title-xs text-foreground-title md:text-title-sm line-clamp-1">{note.title}</h2>
      <p className="text-body-md mt-4 mb-12 line-clamp-2 text-neutral-600">{note.description}</p>

      <div className="mt-auto flex flex-col gap-6">
        <NoteInfoRow
          icon={<FlagFilled className="text-warning size-16" />}
          label="목표"
          value={note.goal}
        />
        <NoteInfoRow
          icon={<Todos className="text-mint size-16" />}
          label="할 일"
          value={note.task}
        />
      </div>

      {/* 태그 표시 제거 전 wrapper className: "mt-10 flex min-w-0 items-center justify-between gap-8" */}
      <div className="mt-10 flex min-w-0 items-center justify-end gap-8">
        {/*
          태그 데이터베이스 도입 전까지 카드 태그를 표시하지 않는다.
          제거 전 코드:
          <div className="flex min-w-0 flex-wrap gap-6">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-body-sm bg-blue-light text-information rounded-md px-8 py-4"
              >
                #{tag}
              </span>
            ))}
          </div>
        */}
        {/* 날짜 문자열은 기계적으로도 날짜임을 알 수 있게 time 요소를 사용한다. */}
        <time className="text-body-sm shrink-0 text-neutral-500">{note.date}</time>
      </div>
    </article>
  );
}

// 필터 UI와 함께 사용하던 배지 개수 계산 함수도 주석으로 보존한다.
// /** 필터 탭 오른쪽 배지에 표시할 개수를 계산한다. */
// function filterCount(notes: NoteMock[], filter: NoteFilter) {
//   // filter는 NoteFilter 유니온 타입이므로 정의되지 않은 필터 이름은 전달할 수 없다.
//   if (filter === "mine") return notes.filter((note) => note.isMine).length;
//   if (filter === "important") return notes.filter((note) => note.isFavorite).length;
//   if (filter === "archive") return notes.filter((note) => note.isArchived).length;
//   return notes.length;
// }

export default function NotePage() {
  // 화면에 표시할 전체 노트 배열. 중요 표시와 새 노트 추가 시 이 배열이 바뀐다.
  const [notes, setNotes] = useState(INITIAL_NOTES);

  // 필터 UI 제거 전 상태:
  // const [activeFilter, setActiveFilter] = useState<NoteFilter>("all");

  // 검색 input의 value와 연결되는 제어 상태다.
  const [searchTerm, setSearchTerm] = useState("");

  // 최신순 또는 오래된순 중 현재 정렬 방향이다.
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");

  // 태그 select 제거 전 상태:
  // const [selectedTag, setSelectedTag] = useState("all");

  // 모바일 Sidebar 드로어의 열림/닫힘 상태다.
  const [menuOpen, setMenuOpen] = useState(false);

  // 태그 select에 표시할 목록을 만들던 코드다.
  // const tags = useMemo(() => Array.from(new Set(notes.flatMap((note) => note.tags))).sort(), [notes]);

  /**
   * 원본 notes를 직접 수정하지 않고 검색과 정렬을 적용한 새 배열을 만든다.
   */
  const visibleNotes = useMemo(() => {
    // 앞뒤 공백을 없애고 소문자로 바꿔 대소문자 차이 없이 검색한다.
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("ko-KR");

    const filtered = notes.filter((note) => {
      // 필터 탭과 태그 select 제거 전 조건:
      // const matchesTab =
      //   activeFilter === "all" ||
      //   (activeFilter === "mine" && note.isMine) ||
      //   (activeFilter === "important" && note.isFavorite) ||
      //   (activeFilter === "archive" && note.isArchived);
      // const matchesTag = selectedTag === "all" || note.tags.includes(selectedTag);

      // 태그 검색 제거 전 검색 대상:
      // const searchableText = [note.title, note.description, note.goal, note.task, ...note.tags]
      //   .join(" ")
      //   .toLocaleLowerCase("ko-KR");
      // return matchesTab && matchesTag && searchableText.includes(normalizedSearch);

      // 현재 검색은 제목, 설명, 목표, 할 일만 대상으로 한다.
      const searchableText = [note.title, note.description, note.goal, note.task].join(" ").toLocaleLowerCase("ko-KR");

      return searchableText.includes(normalizedSearch);
    });

    // sort는 원본 배열을 변경하므로 spread([...filtered])로 먼저 복사한 뒤 정렬한다.
    // 날짜가 YYYY. MM. DD 형식이어서 문자열 비교로도 시간순 정렬이 가능하다.
    return [...filtered].sort((a, b) =>
      sortOrder === "recent" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
    // 필터 제거 전 의존성 배열: [activeFilter, notes, searchTerm, selectedTag, sortOrder]
  }, [notes, searchTerm, sortOrder]);

  /** 별 버튼을 클릭한 노트 한 건의 isFavorite만 반전한다. */
  const handleFavoriteToggle = (id: number) => {
    // 이전 상태가 필요하므로 setNotes에 배열 대신 콜백 함수를 전달한다.
    setNotes((currentNotes) =>
      // map은 새 배열을 만든다. 대상 id는 전개 연산자로 복사한 뒤 값만 바꾸고 나머지는 그대로 반환한다.
      currentNotes.map((note) => (note.id === id ? { ...note, isFavorite: !note.isFavorite } : note)),
    );
  };

  /** Storybook에서 새 노트 추가 동작을 확인하기 위한 mock 이벤트 핸들러 */
  const handleNewNote = () => {
    const newNote: NoteMock = {
      // 서버가 id를 주지 않으므로 현재 시간을 Story 안에서만 사용할 임시 id로 쓴다.
      id: Date.now(),
      title: "새로 작성한 학습 노트",
      description: "Storybook에서 추가한 mock 노트입니다. 입력 화면이나 API 요청은 연결하지 않았습니다.",
      goal: "꾸준히 학습 기록 남기기",
      task: "오늘 배운 내용 정리하기",
      // tags: ["새노트", "학습"],
      date: "2024. 04. 30",
      tone: "yellow",
      isFavorite: false,
      // isArchived: false,
      // isMine: true,
    };

    // 새 노트를 배열 맨 앞에 넣어 최신 노트처럼 보이게 한다.
    setNotes((currentNotes) => [newNote, ...currentNotes]);

    // 필터와 태그 select 제거 전 초기화 코드:
    // setActiveFilter("all");
    // setSelectedTag("all");
    // 방금 만든 노트가 즉시 보이도록 검색어를 초기화한다.
    setSearchTerm("");
  };

  return (
    <div className={`bg-surface text-foreground flex min-h-screen w-full`}>
      {/*
        (main)/layout.tsx가 태블릿 이상에서 Sidebar를 렌더링하므로 중복되는 페이지 Sidebar를 주석 처리한다.
        <div className="sticky top-0 hidden h-screen md:block [&>aside]:h-full [&>aside]:min-h-0">
          <Sidebar />
        </div>
      */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* 반투명 backdrop을 누르면 메뉴 상태를 false로 바꿔 닫는다. */}
          <button
            type="button"
            className="absolute inset-0 bg-neutral-900/40"
            aria-label="메뉴 닫기"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative h-full w-280 [&>aside]:h-full [&>aside]:min-h-0">
            <Sidebar />
            <Button
              type="button"
              variant="ghost"
              size="md"
              aria-label="메뉴 닫기"
              className="absolute top-16 right-16 px-6"
              onClick={() => setMenuOpen(false)}
            >
              <X className="size-20" />
            </Button>
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <MobileHeader
          menuOpen={menuOpen}
          // 메뉴 버튼을 클릭하면 menuOpen이 true가 되고 위의 드로어가 렌더링된다.
          onMenuClick={() => setMenuOpen(true)}
        />
        {/* 기존 코드는 (main)/layout.tsx의 main 요소와 중첩되므로 주석 처리한다. */}
        {/* <main className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-112 md:px-32 md:pt-40 md:pb-40 xl:px-40"> */}
        {/* 새로 추가: layout의 main 안에서는 동일한 스타일을 가진 div를 콘텐츠 컨테이너로 사용한다. */}
        <div className="mx-auto w-full max-w-screen-xl px-16 pt-24 pb-112 md:px-32 md:pt-40 md:pb-40 xl:px-40">
          <section className="relative mb-24 md:mb-32 md:min-h-248 xl:min-h-184">
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
                  onClick={handleNewNote}
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
                onChange={setSearchTerm}
              />
              <NewNoteButton
                onClick={handleNewNote}
                className="hidden md:inline-flex"
              />
            </div>
          </section>

          {/*
            필터 제거 전 section 속성:
            aria-label="노트 필터"
            className="mb-24 flex flex-col gap-12 md:mb-32 xl:flex-row xl:items-center xl:justify-between"
          */}
          <section
            aria-label="노트 정렬"
            className="mb-24 flex justify-end md:mb-32"
          >
            {/*
              전체/내 노트/중요/아카이브 필터 제거 전 코드:
              <div className="grid grid-cols-4 gap-8 md:flex md:flex-wrap md:gap-12">
                {NOTE_FILTERS.map((filter) => (
                  <FilterTab
                    key={filter.id}
                    filter={filter}
                    count={filterCount(notes, filter.id)}
                    active={activeFilter === filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                  />
                ))}
              </div>
            */}

            <div className="flex justify-end gap-8">
              {/* 새로 추가: 운영체제 UI 대신 프로젝트 디자인을 사용하는 공용 Select다. */}
              <Select
                label="정렬 순서"
                options={SORT_OPTIONS}
                value={sortOrder}
                onChange={(value) => setSortOrder(value as SortOrder)}
              />

              {/*
                태그 select 제거 전 코드:
                <FilterSelect
                  label="태그"
                  value={selectedTag}
                  onChange={setSelectedTag}
                  icon={<Tag className="size-18" />}
                >
                  <option value="all">전체 태그</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </FilterSelect>
              */}
            </div>
          </section>

          {/* 보여 줄 노트가 있으면 목록, 없으면 빈 상태 UI 중 하나를 렌더링한다. */}
          {visibleNotes.length > 0 ? (
            <section
              aria-label="노트 목록"
              className="grid grid-cols-1 gap-16 lg:grid-cols-2 xl:grid-cols-3 xl:gap-20"
            >
              {visibleNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </section>
          ) : (
            // 검색 결과가 0개일 때 빈 영역을 보여 줘 화면이 고장 난 것으로 오해하지 않게 한다.
            <section className="border-border flex min-h-240 flex-col items-center justify-center rounded-xl border bg-white px-24 text-center shadow-sm">
              <NoteFilled className="mb-12 size-40 text-neutral-400" />
              <h2 className="text-title-xs">조건에 맞는 노트가 없어요.</h2>
              {/* 필터 제거 전 안내 문구: 검색어나 필터를 바꿔 다시 확인해보세요. */}
              <p className="text-body-md mt-4 text-neutral-600">검색어를 바꿔 다시 확인해보세요.</p>
            </section>
          )}
          {/* 기존 main 닫는 태그를 주석 처리한다. */}
          {/* </main> */}
          {/* 새로 추가: 위에서 추가한 콘텐츠 컨테이너 div의 닫는 태그다. */}
        </div>
      </div>
      {/*
        (main)/layout.tsx가 모바일에서 BottomNav를 렌더링하므로 중복되는 페이지 BottomNav를 주석 처리한다.
        <div className="md:hidden [&_nav]:z-30">
          <BottomNav activeHref={ROUTES.notes} />
        </div>
      */}
    </div>
  );
}
