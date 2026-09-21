import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Logo, { type LogoVariant } from ".";

const meta = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: {
  name: string;
  variant: LogoVariant;
  className: string;
  dark?: boolean;
}[] = [
  {
    name: "Horizontal",
    variant: "horizontal",
    className: "w-[240px]",
  },
  {
    name: "Horizontal With Tagline",
    variant: "horizontalWithTagline",
    className: "w-[240px]",
  },
  {
    name: "Vertical With Tagline",
    variant: "verticalWithTagline",
    className: "w-[160px]",
  },
  {
    name: "Symbol",
    variant: "symbol",
    className: "w-[100px]",
  },
  {
    name: "Horizontal Inverse",
    variant: "horizontalInverse",
    className: "w-[240px]",
    dark: true,
  },
  {
    name: "Horizontal Monochrome",
    variant: "horizontalMonochrome",
    className: "w-[240px]",
  },
  {
    name: "App Icon",
    variant: "appIcon",
    className: "w-[120px]",
  },
];

export const AllVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-2xl font-bold">Logo Variants</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {variants.map(({ name, variant, className, dark }) => (
            <section
              key={variant}
              className={[
                "flex min-h-[220px] flex-col rounded-2xl border p-6",
                dark ? "bg-slate-900" : "bg-white",
              ].join(" ")}
            >
              <h2 className={["mb-6 text-sm font-semibold", dark ? "text-white" : "text-slate-900"].join(" ")}>
                {name}
              </h2>

              <div className="flex flex-1 items-center justify-center">
                <Logo
                  variant={variant}
                  className={className}
                />
              </div>

              <p className={["mt-6 text-xs", dark ? "text-slate-300" : "text-slate-500"].join(" ")}>
                {`variant="${variant}"`}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  ),
};
