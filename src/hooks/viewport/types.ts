import type { MEDIA_QUERIES } from "./constants";

export type Viewport = {
  [Key in keyof typeof MEDIA_QUERIES]: boolean;
};
