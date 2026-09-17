const MOCK_GOALS = [
  { id: 1, title: "자바스크립트로 웹 서비스 만들기", isActive: true },
  { id: 2, title: "타입스크립트 마스터하기", isActive: false },
  { id: 3, title: "자바스크립트로 웹 서비스 만들기와 같은 엄청 긴 제목", isActive: false },
  { id: 4, title: "자바스크립트로 웹 서비스 만들기와 같은 엄청 긴 제목", isActive: false },
];

export default function GoalSection() {
  return (
    <ul className="flex max-h-174 flex-col gap-4 overflow-y-auto">
      {MOCK_GOALS.map((goal) => (
        <li key={goal.id}>
          <button
            type="button"
            className={`text-body-md w-full truncate rounded-lg p-12 text-left ${
              goal.isActive ? "bg-primary-100 text-primary-600" : "hover:bg-primary-50 text-neutral-700"
            }`}
          >
            {goal.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
