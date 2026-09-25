export const NOTE_FILTERS = [
  { id: "all", label: "전체", count: 8 },
  { id: "mine", label: "내 노트", count: 7 },
  { id: "important", label: "중요", count: 2 },
  { id: "archive", label: "아카이브", count: 1 },
] as const;

export type NoteFilter = (typeof NOTE_FILTERS)[number]["id"];
export type NoteTone = "mint" | "coral" | "blue" | "yellow";

export interface NoteMock {
  id: number;
  title: string;
  description: string;
  goal: string;
  task: string;
  tags: string[];
  date: string;
  tone: NoteTone;
  isFavorite: boolean;
  isArchived: boolean;
  isMine: boolean;
}

export const INITIAL_NOTES: NoteMock[] = [
  {
    id: 1,
    title: "프로그래밍과 데이터 in JavaScript",
    description:
      "자바스크립트의 데이터 타입, 참조와 값의 차이에 대해 정리합니다. 객체와 배열의 메모리 구조도 함께 학습했어요.",
    goal: "자바스크립트로 웹 서비스 만들기",
    task: "프로그래밍과 데이터 in JavaScript",
    tags: ["JavaScript", "개념정리"],
    date: "2024. 04. 29",
    tone: "mint",
    isFavorite: true,
    isArchived: false,
    isMine: true,
  },
  {
    id: 2,
    title: "체계적인 폴더 구조 세팅하기",
    description:
      "프로젝트 규모가 커질수록 폴더 구조가 중요해진다. 기능 단위로 나누고, 재사용 가능한 컴포넌트는 공통 폴더에 정리.",
    goal: "자바스크립트로 웹 서비스 만들기",
    task: "체계적인 폴더 구조 세팅하기",
    tags: ["프로젝트", "폴더구조"],
    date: "2024. 04. 28",
    tone: "coral",
    isFavorite: false,
    isArchived: false,
    isMine: true,
  },
  {
    id: 3,
    title: "자바스크립트로 서버 연동하기",
    description: "fetch와 axios의 차이, 요청/응답 구조, 에러 핸들링 방법을 정리합니다.",
    goal: "자바스크립트로 웹 서비스 만들기",
    task: "자바스크립트로 서버 연동하기",
    tags: ["API", "JavaScript"],
    date: "2024. 04. 27",
    tone: "blue",
    isFavorite: false,
    isArchived: false,
    isMine: true,
  },
  {
    id: 4,
    title: "자바스크립트 오류/로딩 상태 처리하기",
    description: "try-catch문을 활용한 에러 처리, 로딩 상태 관리 패턴을 정리합니다.",
    goal: "자바스크립트로 웹 서비스 만들기",
    task: "자바스크립트 오류/로딩 상태 처리하기",
    tags: ["에러처리", "비동기"],
    date: "2024. 04. 26",
    tone: "coral",
    isFavorite: false,
    isArchived: false,
    isMine: true,
  },
  {
    id: 5,
    title: "자바스크립트를 배우기 전 알아두어야 할 것",
    description: "프로그래밍의 기본 개념, 컴퓨터 동작 원리, 브라우저가 코드를 실행하는 과정을 정리했습니다.",
    goal: "자바스크립트로 웹 서비스 만들기",
    task: "자바스크립트 시작하기 전 준비",
    tags: ["기초지식", "개발상식"],
    date: "2024. 04. 25",
    tone: "yellow",
    isFavorite: true,
    isArchived: false,
    isMine: true,
  },
  {
    id: 6,
    title: "디자인 시스템 참고 자료",
    description: "컬러, 타이포그래피, 컴포넌트 설계 원칙 등 좋은 디자인 시스템을 만드는 방법.",
    goal: "디자인 시스템 강의 듣기",
    task: "디자인 시스템 사례 조사하기",
    tags: ["UI/UX", "디자인"],
    date: "2024. 04. 22",
    tone: "mint",
    isFavorite: false,
    isArchived: false,
    isMine: true,
  },
  {
    id: 7,
    title: "사용자 인터뷰 질문 정리",
    description: "목표 설정 과정에서 사용자가 겪는 어려움과 기록 습관을 알아보기 위한 질문입니다.",
    goal: "사용자 중심 서비스 기획하기",
    task: "인터뷰 질문지 완성하기",
    tags: ["인터뷰", "기획"],
    date: "2024. 04. 20",
    tone: "blue",
    isFavorite: false,
    isArchived: false,
    isMine: true,
  },
  {
    id: 8,
    title: "회고 작성 가이드",
    description: "잘한 점, 아쉬운 점, 다음 주에 시도할 일을 빠짐없이 기록하는 회고 방법을 정리합니다.",
    goal: "매주 성장 기록 남기기",
    task: "주간 회고 작성하기",
    tags: ["회고", "성장"],
    date: "2024. 04. 18",
    tone: "yellow",
    isFavorite: false,
    isArchived: true,
    isMine: false,
  },
];
