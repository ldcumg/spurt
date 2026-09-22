import BottomNav from ".";
import { NAV_ITEMS } from "../navItems";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Layout/BottomNav",
  component: BottomNav,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  decorators: [
    (Story) => (
      <div className="flex w-390 flex-col gap-32 [&_nav]:static">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      {NAV_ITEMS.map((item) => (
        <div key={item.href}>
          <BottomNav activeHref={item.href} />
        </div>
      ))}
    </>
  ),
};
