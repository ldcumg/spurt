import NotePage2 from "./NotePage";
import ROUTES from "@/constants/routes";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
 * 첨부 시안의 세 Canvas 크기다.
 * 실제 레이아웃 전환은 Tailwind 기본 breakpoint(md/lg/xl)를 사용한다.
 */
const responsiveViewports = {
  mobile: {
    name: "Mobile 390",
    styles: { width: "390px", height: "100vh" },
    type: "mobile",
  },
  tablet: {
    name: "Tablet 1086",
    styles: { width: "1086px", height: "100vh" },
    type: "tablet",
  },
  pc: {
    name: "PC 1672",
    styles: { width: "1672px", height: "100vh" },
    type: "desktop",
  },
} as const;

const meta = {
  title: "Pages/Notes 2",
  component: NotePage2,
  parameters: {
    layout: "fullscreen",
    viewport: { options: responsiveViewports },
    nextjs: {
      appDirectory: true,
      navigation: { pathname: ROUTES.notes },
    },
  },
} satisfies Meta<typeof NotePage2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};

export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};

export const PC: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};
