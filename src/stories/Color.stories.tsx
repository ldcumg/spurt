import {
  BORDER_COLORS,
  FOREGROUND_COLORS,
  NEUTRAL_COLORS,
  PLACEHOLDER_COLORS,
  PRIMARY_COLORS,
  SEMANTIC_COLORS,
  SUPPORTING_COLORS,
  SURFACE_COLORS,
  TRACK_COLORS,
} from "./constants";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

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
      <div className="mt-30 grid grid-cols-4 gap-16">
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

export const Color: Story = {
  render: () => (
    <div className="flex flex-col gap-50">
      <ColorPalette
        label="Primary Colors"
        colors={PRIMARY_COLORS}
      />
      <ColorPalette
        label="Supporting Colors"
        colors={SUPPORTING_COLORS}
      />
      <ColorPalette
        label="Semantic Colors"
        colors={SEMANTIC_COLORS}
      />
      <ColorPalette
        label="Surface Colors"
        colors={SURFACE_COLORS}
      />
      <ColorPalette
        label="Foreground Colors"
        colors={FOREGROUND_COLORS}
      />
      <ColorPalette
        label="Border Colors"
        colors={BORDER_COLORS}
      />
      <ColorPalette
        label="Placeholder Colors"
        colors={PLACEHOLDER_COLORS}
      />
      <ColorPalette
        label="Track Colors"
        colors={TRACK_COLORS}
      />
      <ColorPalette
        label="Neutral Colors"
        colors={NEUTRAL_COLORS}
      />
    </div>
  ),
};
