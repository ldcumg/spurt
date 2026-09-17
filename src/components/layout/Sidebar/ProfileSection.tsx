// TODO: 모바일 ver
// TODO: props 받기
// TODO: JSDoc 주석 달기
// TODO: 스토리북 추가
export default function ProfileSection() {
  return (
    <div className="flex items-center gap-8 rounded-full border border-neutral-200 p-12">
      <div className="bg-primary-100 size-36 shrink-0 rounded-full" />
      <div>
        <p className="text-title-xs truncate text-neutral-700">체다치즈</p>
        <p className="text-caption truncate text-neutral-400">cheddacheese@spurt.com</p>
      </div>
    </div>
  );
}
