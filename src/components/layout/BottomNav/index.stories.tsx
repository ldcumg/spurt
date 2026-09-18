import BottomNav from ".";
import ROUTES from "@/constants/routes";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Layout/BottomNav",
  component: BottomNav,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: ROUTES.dashboard,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-390 [&>nav]:static">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof BottomNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
