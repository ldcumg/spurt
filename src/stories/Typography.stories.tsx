import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const DISPLAY_TYPOGRAPHIES = [
  {
    name: "display",
    fontSize: "32px",
    fontWeight: 700,
    lineHeight: "42px",
    purpose: "큰 Branding",
  },
] as const;

const TITLE_TYPOGRAPHIES = [
  {
    name: "title-lg",
    fontSize: "28px",
    fontWeight: 700,
    lineHeight: "38px",
    purpose: "Page 제목",
  },
  {
    name: "title-md",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "34px",
    purpose: "큰 Card",
  },
  {
    name: "title-sm",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "30px",
    purpose: "Section",
  },
  {
    name: "title-xs",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "24px",
    purpose: "Card 제목",
  },
] as const;

const BODY_TYPOGRAPHIES = [
  {
    name: "body-lg",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "26px",
    purpose: "주요 본문",
  },
  {
    name: "body-md",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    purpose: "일반 UI",
  },
  {
    name: "body-sm",
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: "20px",
    purpose: "보조설명",
  },
] as const;

const CAPTION_TYPOGRAPHIES = [
  {
    name: "caption",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
    purpose: "날짜/Hint",
  },
] as const;

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
