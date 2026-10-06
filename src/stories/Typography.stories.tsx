import { BODY_TYPOGRAPHIES, CAPTION_TYPOGRAPHIES, DISPLAY_TYPOGRAPHIES, TITLE_TYPOGRAPHIES } from "./constants";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "foundations",
} satisfies Meta;

export default meta;

interface TypographyPaletteProps {
  typographies: readonly {
    name: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
    purpose: string;
  }[];
}

function TypographyPalette({ typographies }: TypographyPaletteProps) {
  return (
    <div>
      <div className="flex flex-row items-center gap-50">
        {typographies.map(({ name, fontSize, fontWeight, lineHeight, purpose }) => (
          <div key={name}>
            <h2 className={`text-${name}`}>{name}</h2>
            <div className={`text-${name}`}>font size : {fontSize}</div>
            <div className={`text-${name}`}>font weight : {fontWeight}</div>
            <div className={`text-${name}`}>line height : {lineHeight}</div>
            <div className={`text-${name}`}>용도 : {purpose}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

type Story = StoryObj<typeof meta>;

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-80">
      <TypographyPalette typographies={DISPLAY_TYPOGRAPHIES} />
      <TypographyPalette typographies={TITLE_TYPOGRAPHIES} />
      <TypographyPalette typographies={BODY_TYPOGRAPHIES} />
      <TypographyPalette typographies={CAPTION_TYPOGRAPHIES} />
    </div>
  ),
};
