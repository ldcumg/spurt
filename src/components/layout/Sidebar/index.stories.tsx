import ROUTES from "@/constants/routes";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Sidebar from ".";
import { NAV_ITEMS } from "../navItems";
import NavSection from "./NavSection";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: ROUTES.dashboard,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NavItemStates: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className="flex gap-24">
      {NAV_ITEMS.map((item) => (
        <div key={item.href} className="w-200">
          <NavSection activeHref={item.href} />
        </div>
      ))}
    </div>
  ),
};
