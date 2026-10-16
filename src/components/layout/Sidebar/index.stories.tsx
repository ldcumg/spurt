import ROUTES from "@/constants/routes";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Sidebar from ".";
import { NAV_ITEMS } from "../navItems";
import NavSection from "./NavSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoalStoreProvider } from "@/contexts/GoalStoreContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

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
  // 💡 여기에 decorators를 선언해야 Default와 NavItemStates 모두 안전하게 감싸집니다!
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <GoalStoreProvider>
          <Story />
        </GoalStoreProvider>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const NavItemStates: Story = {
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

// const meta = {
//   title: "Layout/Sidebar",
//   component: Sidebar,
//   parameters: {
//     layout: "fullscreen",
//     nextjs: {
//       appDirectory: true,
//       navigation: {
//         pathname: ROUTES.dashboard,
//       },
//     },
//   },
//   tags: ["autodocs"],
// } satisfies Meta<typeof Sidebar>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// export const Default: Story = {};

// export const NavItemStates: Story = {
//   parameters: { layout: "centered" },
//   render: () => (
//     <div className="flex gap-24">
//       {NAV_ITEMS.map((item) => (
//         <div
//           key={item.href}
//           className="w-200"
//         >
//           <NavSection activeHref={item.href} />
//         </div>
//       ))}
//     </div>
//   ),
// };
