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
    <AppLayout>
      <SidebarPlaceholder />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1">
          <div className="mx-auto w-full max-w-[1180px] px-4 py-4 md:px-6 md:py-8 xl:px-8">
            {/*
              PC에서만 검색창을 최상단에 표시합니다.
              xl:block : PC(xl 이상)에서만 표시
            */}
            <div className="hidden xl:block">
              <SearchSection />
            </div>

            <PageIntro />

            {/*
              모바일 / 태블릿에서는 기존 위치를 그대로 유지합니다.
              xl:hidden : PC에서는 위쪽 SearchSection을 사용하므로 숨김
            */}
            <div className="xl:hidden">
              <SearchSection />
            </div>

            <FilterSection />

            <NoteList />
          </div>
        </main>

        <BottomNavigation />
      </div>
    </AppLayout>
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
    <header className="flex h-14 items-center justify-between bg-red-100 px-4 md:hidden">
      {/*
        반응형 추가

        md:hidden
        : 이미지 기준 태블릿/PC에서는 좌측 Sidebar가 있으므로
          기존 모바일 Header를 숨김
      */}

      <button>☰</button>

      <div className="text-center">
        <strong>Sprut</strong>
        <p className="text-[10px]">오늘도, 한 걸음 더</p>
      </div>

      <div>●</div>
    </header>
  );
}

function PageIntro() {
  return (
    <section className="bg-yellow-100 py-4 md:py-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="hidden text-sm font-semibold md:mb-2 md:block">노트</p>

          {/*
            반응형 추가

            모바일 이미지에는 별도의 작은 "노트" 텍스트가 없으므로 숨김
            태블릿 이상부터 표시
          */}

          <h1 className="text-2xl font-bold md:text-3xl">노트 모아보기</h1>

          {/*
            반응형 추가

            모바일: text-2xl
            태블릿 이상: text-3xl
          */}

          <p className="mt-1 text-sm md:mt-2">
            각 할 일에서 정리한 노트를 한눈에 확인하고,
            <br className="hidden md:block" />
            다시 성장의 재료로 활용해보세요.
          </p>
        </div>

        <button className="shrink-0 rounded-lg bg-green-300 px-3 py-2 text-sm md:hidden">
          {/*
            모바일에서는 기존 위치 유지

            태블릿부터는 SearchSection 오른쪽으로 이동시키기 위해 숨김
          */}
          + 새 노트
        </button>

        <div className="hidden bg-lime-200 md:block md:h-[110px] md:w-[240px] xl:h-[130px] xl:w-[320px]">
          {/*
            반응형 추가

            참고 이미지의 우측 일러스트 영역

            모바일에서는 기존처럼 생략
            태블릿/PC에서만 공간 확보
          */}
          이미지 영역
        </div>
      </div>
    </section>
  );
}

function SearchSection() {
  return (
    <section className="bg-blue-100 py-3 md:mt-3 md:py-0 xl:mt-0 xl:mb-6">
      {/*
        모바일
        - 기존 py-3 유지

        태블릿
        - 기존 위치 그대로
        - md:mt-3 유지

        PC
        - 검색창이 최상단에 위치하므로 위쪽 margin 제거
        - PageIntro와 간격을 위해 xl:mb-6 추가
      */}

      <div className="flex gap-3">
        <input
          placeholder="노트 제목, 내용, 할 일, 목표로 검색해보세요."
          className="h-10 min-w-0 flex-1 rounded-xl border bg-white px-4 text-sm md:h-12"
        />

        <button className="hidden shrink-0 rounded-xl bg-green-300 px-7 text-sm md:block">+ 새 노트</button>
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
