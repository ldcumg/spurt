import { NAV_ITEMS } from "../navItems";
import NavItem from "./NavItem";
import { Plus, Flag, Todos, FlagFilled } from "@/assets/icons";
import Button from "@/components/ui/Button";

const MOCK_GOALS = [
  { id: 1, title: "자바스크립트로 웹 서비스 만들기" },
  { id: 2, title: "타입스크립트 마스터하기" },
  { id: 3, title: "자바스크립트로 웹 서비스 만들기와 같은 엄청 긴 제목" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full flex-col bg-white px-16 py-20">
      {/**TODO: 로고 추가 */}
      <nav>
        <ul className="flex flex-col gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavItem {...item} />
            </li>
          ))}
        </ul>
      </nav>
      <hr className="border-neutral-200" />
      <section className="flex flex-col gap-12">
        <div className="flex items-center justify-between">
          <h2 className="text-title-xs text-neutral-700">내 목표</h2>
          <button>
            <Plus className="size-24 shrink-0" />
          </button>
        </div>
        <ul className="flex flex-col">
          {MOCK_GOALS.map((goal) => (
            <li
              key={goal.id}
              className="flex items-center gap-12 p-8"
            >
              <FlagFilled className="size-24 shrink-0" />
              <span className="text-body-md truncate text-neutral-700">{goal.title}</span>
            </li>
          ))}
        </ul>
      </section>
      <hr className="border-neutral-200" />
      <div className="flex gap-16">
        <Button
          variant="primary"
          size="square"
        >
          <FlagFilled className="size-24" />새 목표
        </Button>
        <Button
          variant="outline"
          size="square"
        >
          <Todos className="size-24" />새 할일
        </Button>
      </div>
      <div className="flex items-center rounded-full border border-neutral-200 px-12 py-8">
        <div className="bg-primary-100 size-36 shrink-0 rounded-full" />
        <div>
          <p className="text-title-xs truncate text-neutral-700">체다치즈</p>
          <p className="text-caption truncate text-neutral-400">cheddacheese@spurt.com</p>
        </div>
      </div>
    </aside>
  );
}
