interface DashBoardHeaderProps {
  userName: string | undefined;
}

export default function DashBoardHeader({ userName }: DashBoardHeaderProps) {
  return (
    <header>
      <p className="text-display">
        <span>좋은 하루에요,</span>
        <br />
        <span>{userName} 님!👋</span>
      </p>
      <p className="text-title-xs text-neutral-500">오늘도 당신의 목표를 향해 한 걸음 더 나아가요.</p>
    </header>
  );
}
