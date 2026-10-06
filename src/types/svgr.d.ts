import type { FC, SVGProps } from "react";

declare module "*.svg" {
  const svg: FC<SVGProps<SVGSVGElement>>;

  export default svg;
}
