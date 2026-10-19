import { SPACINGS } from "./constants";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "FOUNDATION",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spacing: Story = {
  render: () => (
    <>
      <h2 className="text-title-lg">Spacing</h2>
      <div className="relative mt-10 flex flex-col gap-20 before:absolute before:top-0 before:bottom-0 before:left-90 before:w-px before:bg-black">
        {SPACINGS.map((spacing) => (
          <div
            key={spacing}
            className="flex items-center justify-start gap-20"
          >
            <span className="text-body-sm w-70 text-center">space-{spacing}</span>
            <div className={`h-16 w-${spacing} bg-primary-500`} />
            <span className="text-body-sm">{spacing}px</span>
          </div>
        ))}
      </div>
    </>
  ),
};
