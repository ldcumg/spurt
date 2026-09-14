import Button from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    variant: "primary",
    children: "버튼 내용",
    disabled: false,
  },
};

export const Outline: Story = {
  args: {
    size: "md",
    variant: "outline",
    children: "버튼 내용",
    disabled: false,
  },
};

export const Ghost: Story = {
  args: {
    size: "md",
    variant: "ghost",
    children: "버튼 내용",
    disabled: false,
  },
};

export const XSmall: Story = {
  args: {
    size: "xs",
    variant: "primary",
    children: "버튼 내용",
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    variant: "primary",
    children: "버튼 내용",
    disabled: false,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    variant: "primary",
    children: "버튼 내용",
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    variant: "primary",
    children: "버튼 내용",
    disabled: false,
  },
};

export const XLarge: Story = {
  args: {
    size: "xl",
    variant: "primary",
    children: "버튼 내용",
    disabled: false,
  },
};

export const Wide: Story = {
  args: {
    size: "wide",
    variant: "primary",
    children: "버튼 내용",
    disabled: false,
  },
};

export const Square: Story = {
  args: {
    size: "square",
    variant: "primary",
    children: "버튼 내용",
    disabled: false,
  },
};
