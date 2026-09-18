"use client";

import { NAV_ITEMS } from "../navItems";
import NavItem from "./NavItem";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white pb-34 shadow-md">
      <ul className="flex items-center gap-8 px-8 py-4">
        {NAV_ITEMS.map((item) => (
          <li
            key={item.href}
            className="flex flex-1"
          >
            <NavItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
