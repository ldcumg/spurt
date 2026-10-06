import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "title-lg",
        "title-md",
        "title-sm",
        "title-xs",
        "body-lg",
        "body-md",
        "body-sm",
        "caption",
      ],
    },
  },
});
