"use client";

import ROUTES from "@/constants/routes";
import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { FC, MouseEvent, SVGProps } from "react";

interface NavItemProps {
  href: string;
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  ActiveIcon: FC<SVGProps<SVGSVGElement>>;
  isActive?: boolean;
}

export default function NavItem({ href, label, Icon, ActiveIcon, isActive }: NavItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  // 목표 메뉴인지 확인
  const isGoalRoute = href === ROUTES.goals;

  // 활성화(Active) 조건: 목표는 하위 상세(/goals/1 등)까지 포함해 활성 판정, 그 외는 정확한 경로 일치 비교
  // const active = isActive ?? pathname === href; 을 수정했습니다. (해당 페이지를 다시 로드하는 것 방지)
  const active = isActive ?? (isGoalRoute ? pathname.startsWith(ROUTES.goals) : pathname === href);
  const CurrentIcon = active ? ActiveIcon : Icon;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // [공통] 현재 머물고 있는 페이지라면 모든 메뉴의 라우팅 동작 차단
    if (active) {
      e.preventDefault();
      return;
    }

    // [목표 메뉴 특수 처리] 다른 페이지에서 목표 메뉴로 진입할 때만 최근 목표 ID로 이동
    if (isGoalRoute) {
      const recentGoalId = localStorage.getItem("recentGoalId");
      if (recentGoalId) {
        e.preventDefault();
        router.push(`${ROUTES.goals}/${recentGoalId}`);
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={twMerge(
        clsx(
          "text-body-md flex h-44 w-full items-center gap-12 rounded-lg px-16 py-12 font-semibold",
          active ? "bg-primary-100 text-primary-700" : "hover:bg-primary-50 text-neutral-700",
        ),
      )}
    >
      <CurrentIcon className="size-24 shrink-0" />
      {label}
    </Link>
  );
}
