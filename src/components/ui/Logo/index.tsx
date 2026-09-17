import Image from "next/image";
import { twMerge } from "tailwind-merge";

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
    src: string;
    alt: string;
  }
> = {
  horizontal: {
    src: "/src/assets/images/logo/LogoHorizontal.webp",
    alt: "Spurt",
  },

  horizontalWithTagline: {
    src: "/src/assets/images/logo/LogoHorizontalWithTagline.webp",
    alt: "Spurt - 오늘도, 한 걸음 더",
  },

  verticalWithTagline: {
    src: "/src/assets/images/logo/LogoVerticalWithTagline.webp",
    alt: "Spurt - 오늘도, 한 걸음 더",
  },

  symbol: {
    src: "/src/assets/images/logo/LogoSymbol.webp",
    alt: "Spurt",
  },

  horizontalInverse: {
    src: "/src/assets/images/logo/LogoHorizontalWhite.webp",
    alt: "Spurt - 오늘도, 한 걸음 더",
  },

  horizontalMonochrome: {
    src: "/src/assets/images/logo/LogoHorizontalMonochrome.webp",
    alt: "Spurt - 오늘도, 한 걸음 더",
  },

  appIcon: {
    src: "/src/assets/images/logo/LogoAppIcon.webp",
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
      width={500}
      height={500}
      priority={priority}
      className={twMerge("h-auto w-auto object-contain", className)}
    />
  );
}
