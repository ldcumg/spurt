import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const SPACINGS = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 100, 200] as const;

const meta = {
  title: "foundations",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spacing: Story = {
  render: () => (
    <>
      <h2 className="text-title-lg">Spacing</h2>
      <div className="mt-10 flex flex-col gap-20">
        {SPACINGS.map((spacing) => (
          <div
            key={spacing}
            className="flex items-center gap-20"
          >
            <span className="text-body-sm">space-{spacing}</span>
            <div className={`bg-primary-500 h-16 w-${spacing}`} />
            <span className="text-body-sm">{spacing}px</span>
          </div>
        ))}
      </div>
    </>
  ),
};
