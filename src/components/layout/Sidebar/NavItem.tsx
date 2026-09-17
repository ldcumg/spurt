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
}

export default function NavItem({ href, label, Icon, ActiveIcon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const CurrentIcon = isActive ? ActiveIcon : Icon;

  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          "text-title-xs hover:bg-primary-50 flex h-44 w-full items-center gap-12 rounded-lg px-16 py-12",
          isActive ? "bg-primary-100 text-primary-700" : "text-neutral-700",
        ),
      )}
    >
      <CurrentIcon className="size-24 shrink-0" />
      {label}
    </Link>
  );
}
