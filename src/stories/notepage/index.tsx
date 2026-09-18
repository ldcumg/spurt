import { Burger, Plus, Search } from "@/assets/icons";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import Profile from "@/components/ui/Profile";
import Image from "next/image";
import infoImage from "@/assets/images/notepage/notepage_info_image.png";
import TextInput from "@/components/ui/TextInput";

const notes = [
  {
    title: "프로그래밍과 데이터 in JavaScript",
    description: "자바스크립트의 데이터 타입, 참조와 값의 차이에 대해 정리합니다.",
    goal: "자바스크립트로 웹 서비스 만들기",
    task: "프로그래밍과 데이터 in JavaScript",
    tags: ["JavaScript", "개념정리"],
    date: "2024. 04. 29",
  },
  {
    title: "체계적인 폴더 구조 세팅하기",
    description: "프로젝트 규모가 커질수록 폴더 구조가 중요해진다.",
    goal: "자바스크립트로 웹 서비스 만들기",
    task: "체계적인 폴더 구조 세팅하기",
    tags: ["프로젝트", "폴더구조"],
    date: "2024. 04. 28",
  },
  {
    title: "자바스크립트로 서버 연동하기",
    description: "fetch와 axios의 차이, 요청/응답 구조에 대해 정리합니다.",
    goal: "자바스크립트로 웹 서비스 만들기",
    task: "자바스크립트로 서버 연동하기",
    tags: ["API", "JavaScript"],
    date: "2024. 04. 27",
  },
  {
    title: "자바스크립트 오류/로딩 상태 처리하기",
    description: "try-catch문을 활용한 에러 처리와 로딩 상태를 정리합니다.",
    goal: "자바스크립트로 웹 서비스 만들기",
    task: "자바스크립트 오류/로딩 상태 처리하기",
    tags: ["에러처리", "비동기"],
    date: "2024. 04. 26",
  },
  {
    title: "자바스크립트를 배우기 전 알아두어야 할 것",
    description: "프로그래밍의 기본 개념과 컴퓨터 동작 원리를 정리합니다.",
    goal: "자바스크립트로 웹 서비스 만들기",
    task: "자바스크립트 시작하기 전 준비",
    tags: ["기초지식", "개발상식"],
    date: "2024. 04. 25",
  },
  {
    title: "디자인 시스템 참고 자료",
    description: "컬러, 타이포그래피, 컴포넌트 설계 원칙 등 좋은 디자인 시스템을 만드는 방법.",
    goal: "디자인 시스템 강의 듣기",
    task: "디자인 시스템 사례 조사하기",
    tags: ["UI/UX", "디자인"],
    date: "2024. 04. 22",
  },
];

export default function Page() {
  return (
    // <AppLayout>
    // <SidebarPlaceholder />

    <div className="flex flex-col">
      <Header />

      <main className="flex flex-1 flex-col items-stretch gap-4 p-4">
        <PageIntro />

        {/* <div className="hidden xl:block">
            <SearchSection />
          </div> */}

        {/* <TextInput placeholder="노트 제목, 내용, 할 일, 목표로 검색해보세요." /> */}
        <SearchSection />

        {/* <FilterSection /> */}

        {/* <NoteList /> */}
      </main>

      {/* <BottomNavigation /> */}
    </div>
    // </AppLayout>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-slate-100">
      {/*
        변경점

        기존 모바일 max-w-[390px] 제한 제거

        flex
        : 태블릿/PC에서 Sidebar와 Content를 가로로 배치

        min-h-screen
        : 화면 전체 높이 확보
      */}

      {children}
    </div>
  );
}

/**
 * 실제 Sidebar 구현 전까지 공간만 차지하는 컴포넌트
 */
function SidebarPlaceholder() {
  return (
    <aside className="hidden shrink-0 bg-red-100 md:block md:w-[160px] xl:w-[274px]">
      {/*
        반응형 추가

        hidden
        : 모바일에서는 Sidebar 없음

        md:block
        : 태블릿부터 Sidebar 표시

        md:w-[160px]
        : 태블릿 이미지 기준으로 좁은 Sidebar 공간 확보

        xl:w-[274px]
        : PC에서는 Sidebar 폭 증가

        shrink-0
        : 화면이 좁아져도 Sidebar 폭이 줄어들지 않게 함

        bg-red-100
        : 현재는 Sidebar 영역을 확인하기 위한 임시 배경색
      */}
    </aside>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-200 px-8">
      <button>
        <Burger className="size-[24px]" />
      </button>

      <div className="text-center">
        <Logo
          variant="horizontalWithTagline"
          className="h-[48px]"
        />
      </div>

      <Profile />
    </header>
  );
}

function PageIntro() {
  return (
    <section className="bg-gray-300 px-4">
      <div className="flex items-start justify-between gap-8">
        <h1 className="text-title-lg mb-8 font-bold">노트 모아보기</h1>
        <Button className="flex items-center justify-center gap-4">
          <Plus className="size-[14px]" />새 노트
        </Button>
      </div>
      <div className="flex items-start justify-between gap-8">
        <p className="text-body-md">각 할 일에서 정리한 노트를 한눈에 확인하고, 다시 성장의 재료로 활용해보세요.</p>
        <Image
          src={infoImage}
          alt="기록하는 내가 조금씩 더 성장하고 있어요"
          className="w-[40%]"
        />
      </div>
    </section>
  );
}

function SearchSection() {
  return (
    <section className="bg-gray-200">
      <div className="relative flex items-center gap-4">
        <Search className="pointer-events-none absolute top-1/2 left-8 -translate-y-1/2" />
        <input
          placeholder="노트 제목, 내용, 할 일, 목표로 검색해보세요."
          className={`text-body-lg h-48 flex-1 rounded-lg border bg-white pr-16 pl-40 outline-none disabled:opacity-50`}
        />
      </div>
    </section>
  );
}

function FilterSection() {
  const filters = ["전체 8", "내 노트 7", "중요 2", "아카이브 1"];

  return (
    <section className="bg-purple-100 pt-2 pb-4 md:pt-5 md:pb-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        {/*
          모바일
          필터와 정렬 영역을 세로 배치

          태블릿 이상
          필터는 왼쪽
          정렬/태그는 오른쪽
        */}

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className="rounded-lg bg-white px-3 py-2 text-xs md:px-4"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button className="rounded-lg bg-white px-3 py-2 text-xs">최신순⌄</button>

          <button className="rounded-lg bg-white px-3 py-2 text-xs">전체 태그⌄</button>
        </div>
      </div>
    </section>
  );
}

function NoteList() {
  return (
    <section className="grid grid-cols-1 gap-3 bg-green-100 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
      {/*
        핵심 반응형

        모바일
        grid-cols-1
        → 카드 1열

        태블릿
        md:grid-cols-2
        → 카드 2열

        PC
        xl:grid-cols-3
        → 카드 3열
      */}

      {notes.map((note) => (
        <NoteCard
          key={note.title}
          note={note}
        />
      ))}
    </section>
  );
}

type Note = (typeof notes)[number];

function NoteCard({ note }: { note: Note }) {
  return (
    <article className="min-w-0 rounded-xl bg-orange-100 p-3 md:p-4">
      {/*
        반응형 추가

        min-w-0
        : grid 내부에서 긴 텍스트 때문에 카드가 열 너비를
          넘어가는 것을 방지

        md:p-4
        : 태블릿/PC 카드 내부 여백 증가
      */}

      <div className="flex items-start gap-3">
        <div className="h-8 w-8 shrink-0 rounded-lg bg-cyan-300" />

        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-2">
            <div className="min-w-0">
              <h2 className="truncate font-bold">{note.title}</h2>

              <p className="mt-1 line-clamp-2 text-xs">{note.description}</p>
            </div>

            <button className="shrink-0">☆</button>
          </div>

          <NoteInfo
            label="목표"
            value={note.goal}
          />

          <NoteInfo
            label="할 일"
            value={note.task}
          />

          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-wrap gap-1">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white px-2 py-1 text-[10px]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <time className="shrink-0 text-[10px]">{note.date}</time>
          </div>
        </div>
      </div>
    </article>
  );
}

function NoteInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2 flex items-center gap-2 rounded bg-white/60 px-2 py-1 text-xs">
      <strong className="shrink-0">{label}</strong>

      <span className="truncate">{value}</span>
    </div>
  );
}

function BottomNavigation() {
  const menus = ["대시보드", "목표", "모든 할 일", "노트"];

  return (
    <nav className="sticky bottom-0 grid h-16 grid-cols-4 bg-pink-100 md:hidden">
      {/*
        반응형 추가

        모바일에서만 BottomNavigation 사용

        md:hidden
        : 태블릿부터 Sidebar가 메뉴 역할을 하기 때문에 숨김
      */}

      {menus.map((menu) => (
        <button
          key={menu}
          className="flex flex-col items-center justify-center gap-1 text-xs"
        >
          <span>□</span>
          <span>{menu}</span>
        </button>
      ))}
    </nav>
  );
}
