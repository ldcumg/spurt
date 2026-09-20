"use client";

import { twMerge } from "@/lib/twMerge";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC, SVGProps } from "react";

interface NavItemProps {
  href: string;
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  ActiveIcon: FC<SVGProps<SVGSVGElement>>;
  isActive?: boolean;
}

export default function NavItem({ href, label, Icon, ActiveIcon, isActive }: NavItemProps) {
  const pathname = usePathname();
  const active = isActive ?? pathname === href;
  const CurrentIcon = active ? ActiveIcon : Icon;

  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          "text-caption flex flex-1 flex-col items-center gap-2 rounded-md px-8 py-4 font-semibold",
          active ? "text-primary-500" : "text-neutral-600",
        ),
      )}
    >
      <CurrentIcon className={"size-24 shrink-0"} />
      {label}
    </Link>
  );
}
