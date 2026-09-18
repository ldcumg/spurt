import Sidebar from ".";
import ROUTES from "@/constants/routes";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

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
