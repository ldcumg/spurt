// 존재하지 않는 모든 URL 접속 시 혹은 코드 내에서 notFound() 함수를 호출했을 때 최상위 루트 레이아웃(src/app/layout.tsx) 안에서 렌더링됩니다.

import { Sprout } from "@/assets/images/notFoundPage/index";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <p className="text-primary-600 text-6xl md:text-8xl">404</p>
      <p className="text-primary-600 text-2xl sm:text-4xl md:text-6xl">PAGE NOT FOUND</p>
      <p className="text-primary-500 my-20 text-sm sm:my-30 sm:text-lg">
        페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
      </p>
      <Link
        href={`/dashboard`}
        className="z-10"
      >
        <Button
          variant={"outline"}
          size={"xl"}
        >
          메인 페이지로 이동
        </Button>
      </Link>
      {/* 왼쪽 새싹: 모바일에서는 작게 축소/투명도 조정 -> lg 이상에서 원래 크기 */}
      <Sprout
        viewBox="0 0 900 900"
        className="pointer-events-none absolute -bottom-40 -left-60 size-260 shrink-0 scale-x-[-1] opacity-40 lg:top-1/2 lg:left-40 lg:size-500 lg:-translate-y-1/2 lg:opacity-100 xl:left-80 xl:size-600"
      />

      {/* 오른쪽 새싹 */}
      <Sprout
        viewBox="0 0 900 900"
        className="pointer-events-none absolute -top-40 -right-60 size-260 shrink-0 opacity-40 lg:top-1/2 lg:right-40 lg:size-500 lg:-translate-y-1/2 lg:opacity-100 xl:right-80 xl:size-600"
      />
    </div>
  );
}
