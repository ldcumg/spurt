import { RADII } from "./constants";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

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
