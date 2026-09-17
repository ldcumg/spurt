import Image, { type StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

import LogoAppIcon from "@/assets/images/logo/LogoAppIcon.webp";
import LogoHorizontal from "@/assets/images/logo/LogoHorizontal.webp";
import LogoHorizontalWhite from "@/assets/images/logo/LogoHorizontalWhite.webp";
import LogoHorizontalMonochrome from "@/assets/images/logo/LogoHorizontalMonochrome.webp";
import LogoHorizontalWithTagline from "@/assets/images/logo/LogoHorizontalWithTagline.webp";
import LogoSymbol from "@/assets/images/logo/LogoSymbol.webp";
import LogoVerticalWithTagline from "@/assets/images/logo/LogoVerticalWithTagline.webp";

export type LogoVariant =
  | "horizontal"
  | "horizontalWithTagline"
  | "verticalWithTagline"
  | "symbol"
  | "horizontalInverse"
  | "horizontalMonochrome"
  | "appIcon";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

const LOGO_MAP: Record<
  LogoVariant,
  {
    src: StaticImageData;
    alt: string;
  }
> = {
  horizontal: {
    src: LogoHorizontal,
    alt: "Spurt",
  },

  horizontalWithTagline: {
    src: LogoHorizontalWithTagline,
    alt: "Spurt - 오늘도, 한 걸음 더",
  },

  verticalWithTagline: {
    src: LogoVerticalWithTagline,
    alt: "Spurt - 오늘도, 한 걸음 더",
  },

  symbol: {
    src: LogoSymbol,
    alt: "Spurt",
  },

  horizontalInverse: {
    src: LogoHorizontalWhite,
    alt: "Spurt - 오늘도, 한 걸음 더",
  },

  horizontalMonochrome: {
    src: LogoHorizontalMonochrome,
    alt: "Spurt - 오늘도, 한 걸음 더",
  },

  appIcon: {
    src: LogoAppIcon,
    alt: "Spurt",
  },
};

/**
 *
 * @param variant 로고의 다양한 모습, 이름은 파일명에서 Logo를 뺀 카멜케이스이다.
 * @param priority next.js의 Image 컴포넌트에서 제공되는 prop
 * @param className width로 크기조절 가능, 비율은 그대로입니다.
 * @returns
 */
export default function Logo({ variant = "horizontal", className = "", priority = false }: LogoProps) {
  const logo = LOGO_MAP[variant];

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      priority={priority}
      className={twMerge("h-auto w-auto object-contain", className)}
    />
  );
}
