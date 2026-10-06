"use client"

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
          "text-body-md font-semibold flex h-44 w-full items-center gap-12 rounded-lg px-16 py-12",
          active ? "bg-primary-100 text-primary-700" : "hover:bg-primary-50 text-neutral-700",
        ),
      )}
    >
      <CurrentIcon className="size-24 shrink-0" />
      {label}
    </Link>
  );
}
