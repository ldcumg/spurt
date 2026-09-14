import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const PRIMARY_COLORS = [
  "primary-50",
  "primary-100",
  "primary-200",
  "primary-300",
  "primary-400",
  "primary-500",
  "primary-600",
  "primary-700",
] as const;

const SUPPORTING_COLORS = [
  "blue",
  "blue-light",
  "coral",
  "coral-light",
  "yellow",
  "yellow-light",
  "mint",
  "mint-light",
] as const;

const SEMANTIC_COLORS = ["success", "error", "warning", "information", "disabled"] as const;

const SURFACE_COLORS = ["surface", "surface-card"] as const;

const FOREGROUND_COLORS = ["foreground", "foreground-title"] as const;

const BORDER_COLORS = ["border", "input-border"] as const;

const PLACEHOLDER_COLORS = ["placeholder"] as const;

const TRACK_COLORS = ["track"] as const;

const NEUTRAL_COLORS = [
  "neutral-50",
  "neutral-100",
  "neutral-200",
  "neutral-300",
  "neutral-400",
  "neutral-500",
  "neutral-600",
  "neutral-700",
  "neutral-800",
  "neutral-900",
  "white",
] as const;

const meta = {
  title: "foundations",
} satisfies Meta;

export default meta;

interface ColorPaletteProps {
  label: string;
  colors: readonly string[];
}

function ColorPalette({ label, colors }: ColorPaletteProps) {
  return (
    <div>
      <h2 className="text-title-lg">{label}</h2>
      <div className="grid grid-cols-4 gap-16">
        {colors.map((color) => (
          <div key={color}>
            <div className={`h-80 rounded-md border bg-${color}`} />
            <span className="text-body-sm mt-8">{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-50">
      <ColorPalette
        label="Primary Color"
        colors={PRIMARY_COLORS}
      />
      <ColorPalette
        label="Supporting Color"
        colors={SUPPORTING_COLORS}
      />
      <ColorPalette
        label="Semantic Color"
        colors={SEMANTIC_COLORS}
      />
      <ColorPalette
        label="Surface Color"
        colors={SURFACE_COLORS}
      />
      <ColorPalette
        label="Foreground Color"
        colors={FOREGROUND_COLORS}
      />
      <ColorPalette
        label="Border Color"
        colors={BORDER_COLORS}
      />
      <ColorPalette
        label="Placeholder Color"
        colors={PLACEHOLDER_COLORS}
      />
      <ColorPalette
        label="Track Color"
        colors={TRACK_COLORS}
      />
      <ColorPalette
        label="Neutral Color"
        colors={NEUTRAL_COLORS}
      />
    </div>
  ),
};
