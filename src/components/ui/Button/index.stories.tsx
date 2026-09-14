import Button from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "wide", "square"],
      control: {
        type: "radio",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  args: {
    children: "",
    variant: "primary",
    size: "md",
    disabled: false,
  },

  render: ({ children, size, disabled }) => (
    <div className="flex gap-200">
      <Button
        variant="primary"
        size={size}
        disabled={disabled}
      >
        {children || "Primary"}
      </Button>
      <Button
        variant="outline"
        size={size}
        disabled={disabled}
      >
        {children || "Outline"}
      </Button>
      <Button
        variant="ghost"
        size={size}
        disabled={disabled}
      >
        {children || "Ghost"}
      </Button>
    </div>
  ),
};
