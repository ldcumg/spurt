import NoteWrite from "./NoteWrite";
import ROUTES from "@/constants/routes";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const responsiveViewports = {
  mobile: {
    name: "Mobile 390",
    styles: { width: "390px", height: "844px" },
    type: "mobile",
  },
  tablet: {
    name: "Tablet 1086",
    styles: { width: "1086px", height: "1448px" },
    type: "tablet",
  },
  desktop: {
    name: "Desktop 1600",
    styles: { width: "1600px", height: "980px" },
    type: "desktop",
  },
} as const;

const meta = {
  title: "Pages/Note Write",
  component: NoteWrite,
  parameters: {
    layout: "fullscreen",
    viewport: { options: responsiveViewports },
    nextjs: {
      appDirectory: true,
      navigation: { pathname: ROUTES.notes },
    },
  },
} satisfies Meta<typeof NoteWrite>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};

export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};

export const Desktop: Story = {
  globals: { viewport: { value: "desktop", isRotated: false } },
};
