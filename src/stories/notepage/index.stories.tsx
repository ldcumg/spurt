import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Page from ".";

/**
 * Page 반응형 테스트용 viewport
 *
 * Mobile
 * - md(768px) 미만
 *
 * Tablet
 * - md(768px) 이상
 * - xl(1280px) 미만
 *
 * PC
 * - xl(1280px) 이상
 */
const responsiveViewports = {
  mobile: {
    name: "Mobile",
    styles: {
      width: "390px",
      height: "844px",
    },
    type: "mobile",
  },

  tablet: {
    name: "Tablet",
    styles: {
      width: "768px",
      height: "1024px",
    },
    type: "tablet",
  },

  pc: {
    name: "PC",
    styles: {
      width: "1440px",
      height: "810px",
    },
    type: "desktop",
  },
} as const;

const meta = {
  title: "Pages/Notes",
  component: Page,

  parameters: {
    /**
     * Page 자체가 전체 화면 레이아웃이므로
     * Storybook Canvas 기본 padding 제거
     */
    layout: "fullscreen",

    /**
     * 이 Page Story에서 사용할 viewport 등록
     */
    viewport: {
      options: responsiveViewports,
    },
  },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 모바일
 *
 * 390px < md(768px)
 *
 * - Sidebar 숨김
 * - 카드 1열
 * - BottomNavigation 표시
 * - Mobile Header 표시
 */
export const Mobile: Story = {
  globals: {
    viewport: {
      value: "mobile",
      isRotated: false,
    },
  },
};

/**
 * 태블릿
 *
 * 768px >= md
 * 768px < xl(1280px)
 *
 * - Sidebar 표시
 * - 카드 2열
 * - BottomNavigation 숨김
 */
export const Tablet: Story = {
  globals: {
    viewport: {
      value: "tablet",
      isRotated: false,
    },
  },
};

/**
 * PC
 *
 * 1440px >= xl(1280px)
 *
 * - 넓은 Sidebar 표시
 * - 카드 3열
 * - BottomNavigation 숨김
 */
export const PC: Story = {
  globals: {
    viewport: {
      value: "pc",
      isRotated: false,
    },
  },
};
