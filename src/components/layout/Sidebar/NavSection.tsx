import { NAV_ITEMS } from "../navItems";
import NavItem from "./NavItem";

export default function NavSection() {
  return (
    <nav>
      <ul className="flex flex-col gap-8">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <NavItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
