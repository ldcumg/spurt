import Image, { StaticImageData } from "next/image";

import profile_default from "@/assets/images/profile/profile_default.png";
import profile_surprised from "@/assets/images/profile/profile_surprised.png";
import profile_thinking from "@/assets/images/profile/profile_thinking.png";
import profile_excited from "@/assets/images/profile/profile_excited.png";
import profile_love from "@/assets/images/profile/profile_love.png";
import profile_cheering from "@/assets/images/profile/profile_cheering.png";
import profile_greeting from "@/assets/images/profile/profile_greeting.png";
import profile_working from "@/assets/images/profile/profile_working.png";
import profile_sleepy from "@/assets/images/profile/profile_sleepy.png";
import { twMerge } from "tailwind-merge";

// 사용 가능한 유니온 타입 정의
export type ProfileVariant =
  "default" | "surprised" | "thinking" | "excited" | "love" | "cheering" | "greeting" | "working" | "sleepy";

// 단일 이미지 아이템 구조
interface ProfileItem {
  src: StaticImageData;
  alt: string;
}

// 전체 맵 구조 (Key는 ProfileVariant만 허용)
export type ProfileMap = Record<ProfileVariant, ProfileItem>;
const profile_map: ProfileMap = {
  default: {
    src: profile_default,
    alt: "profile-default",
  },
  surprised: {
    src: profile_surprised,
    alt: "profile-surprised",
  },
  thinking: {
    src: profile_thinking,
    alt: "profile-thinking",
  },
  excited: {
    src: profile_excited,
    alt: "profile-excited",
  },
  love: {
    src: profile_love,
    alt: "profile-love",
  },
  cheering: {
    src: profile_cheering,
    alt: "profile-cheering",
  },
  greeting: {
    src: profile_greeting,
    alt: "profile-greeting",
  },
  working: {
    src: profile_working,
    alt: "profile-working",
  },
  sleepy: {
    src: profile_sleepy,
    alt: "profile-sleepy",
  },
};

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ProfileVariant;
  className?: string;
}

export default function Profile({ variant = "default", className, ...props }: ProfileProps) {
  const currentProfile = profile_map[variant];

  return (
    <div
      className={twMerge("relative aspect-square w-32 shrink-0 overflow-hidden rounded-full bg-gray-100", className)}
      {...props}
    >
      <Image
        src={currentProfile.src}
        alt={currentProfile.alt}
        fill
        sizes="128px"
        className="object-cover"
        priority={variant === "default"}
      />
    </div>
  );
}
