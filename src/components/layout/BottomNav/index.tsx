import { NAV_ITEMS } from "../navItems";
import NavItem from "./NavItem";

interface BottomNavProps {
  activeHref?: string;
}

export default function BottomNav({ activeHref }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white pb-34">
      <ul className="flex items-center gap-8 px-8 py-4">
        {NAV_ITEMS.map((item) => (
          <li
            key={item.href}
            className="flex flex-1"
          >
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
