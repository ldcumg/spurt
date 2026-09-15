import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const RADII = [
  {
    name: "sm",
    value: "6px",
    purpose: "Badge",
  },
  {
    name: "md",
    value: "10px",
    purpose: "CheckBox, 작은 요소",
  },
  {
    name: "lg",
    value: "12px",
    purpose: "Button, Input",
  },
  {
    name: "xl",
    value: "16px",
    purpose: "작은 Card",
  },
  {
    name: "2xl",
    value: "20px",
    purpose: "일반 Card",
  },
  {
    name: "3xl",
    value: "24px",
    purpose: "Hero / 큰 Panel",
  },
  {
    name: "full",
    value: "9999px",
    purpose: "Pill",
  },
] as const;

const meta = {
  title: "foundations",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Radius: Story = {
  render: () => (
    <>
      <h2 className="text-title-lg">Radius</h2>
      <div className="mt-50 grid grid-cols-4 gap-50">
        {RADII.map(({ name, value, purpose }) => (
          <div key={name}>
            <div className={`bg-primary-400 size-100 rounded-${name} border`} />
            <div className="text-body-sm mt-8">rounded-{name}</div>
            <div className="text-body-sm">radius : {value}</div>
            <div className="text-body-sm">용도 : {purpose}</div>
          </div>
        ))}
      </div>
    </>
  ),
};
