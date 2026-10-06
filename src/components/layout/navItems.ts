import { Calendar, CalendarFilled, Flag, FlagFilled, Home, HomeFilled, Note, NoteFilled } from "@/assets/icons";
import ROUTES from "@/constants/routes";
import type { FC, SVGProps } from "react";

interface NavItemProps {
  href: string;
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  ActiveIcon: FC<SVGProps<SVGSVGElement>>;
}

export const NAV_ITEMS: NavItemProps[] = [
  { href: ROUTES.dashboard, label: "대시보드", Icon: Home, ActiveIcon: HomeFilled },
  { href: ROUTES.calendar, label: "캘린더", Icon: Calendar, ActiveIcon: CalendarFilled },
  { href: ROUTES.goals, label: "목표", Icon: Flag, ActiveIcon: FlagFilled },
  { href: ROUTES.notes, label: "노트", Icon: Note, ActiveIcon: NoteFilled },
];
