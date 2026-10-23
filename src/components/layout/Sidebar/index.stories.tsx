import Sidebar from ".";
import { NAV_ITEMS } from "../navItems";
import NavSection from "./NavSection";
import { BASE_URL, USERS_API_PATH } from "@/constants/apiEndpoints";
import ROUTES from "@/constants/routes";
import { userMocks } from "@/mocks/handlers/user/mock";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HttpResponse } from "msw";
import { http } from "msw/core/http";

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
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [http.get(`${BASE_URL.client}${USERS_API_PATH.me}`, () => HttpResponse.json(userMocks.users))],
    },
  },
};

export const AllNavitemStates: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className="flex gap-24">
      {NAV_ITEMS.map((item) => (
        <div
          key={item.href}
          className="w-200"
        >
          <NavSection activeHref={item.href} />
        </div>
      ))}
    </div>
  ),
};
