export const PRIMARY_COLORS = [
  "primary-50",
  "primary-100",
  "primary-200",
  "primary-300",
  "primary-400",
  "primary-500",
  "primary-600",
  "primary-700",
] as const;

export const SUPPORTING_COLORS = [
  "blue",
  "blue-light",
  "coral",
  "coral-light",
  "yellow",
  "yellow-light",
  "mint",
  "mint-light",
] as const;

export const SEMANTIC_COLORS = ["success", "error", "warning", "information", "disabled"] as const;

export const SURFACE_COLORS = ["surface", "surface-card"] as const;

export const FOREGROUND_COLORS = ["foreground", "foreground-title"] as const;

export const BORDER_COLORS = ["border", "input-border"] as const;

export const PLACEHOLDER_COLORS = ["placeholder"] as const;

export const TRACK_COLORS = ["track"] as const;

export const NEUTRAL_COLORS = [
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

export const RADII = [
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

export const SPACINGS = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 100, 200] as const;

export const DISPLAY_TYPOGRAPHIES = [
  {
    name: "display",
    fontSize: "32px",
    fontWeight: 700,
    lineHeight: "42px",
    purpose: "큰 Branding",
  },
] as const;

export const TITLE_TYPOGRAPHIES = [
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

export const BODY_TYPOGRAPHIES = [
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

export const CAPTION_TYPOGRAPHIES = [
  {
    name: "caption",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
    purpose: "날짜/Hint",
  },
] as const;
