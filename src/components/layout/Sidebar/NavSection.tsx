"use client";

import { NAV_ITEMS } from "../navItems";
import NavItem from "./NavItem";

interface NavSectionProps {
  activeHref?: string;
}

export default function NavSection({ activeHref }: NavSectionProps) {
  return (
    <nav>
      <ul className="flex flex-col gap-8">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <NavItem
              {...item}
              isActive={activeHref === undefined ? undefined : item.href === activeHref}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
