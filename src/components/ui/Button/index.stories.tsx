import Button from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "wide", "square"],
      control: "radio",
      table: {
        defaultValue: {
          summary: "md",
          detail: "medium",
        },
      },
    },
    disabled: {
      control: "boolean",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "",
    size: "md",
    disabled: false,
  },

  render: ({ children, size, disabled }) => (
    <div className="flex flex-row gap-20">
      <div className="flex w-250 items-center justify-center">
        <Button
          variant="primary"
          size={size}
          disabled={disabled}
        >
          {children || "Primary"}
        </Button>
      </div>
      <div className="flex w-250 items-center justify-center">
        <Button
          variant="outline"
          size={size}
          disabled={disabled}
        >
          {children || "Outline"}
        </Button>
      </div>
      <div className="flex w-250 items-center justify-center">
        <Button
          variant="ghost"
          size={size}
          disabled={disabled}
        >
          {children || "Ghost"}
        </Button>
      </div>
    </div>
  ),
};
