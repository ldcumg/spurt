import type { StorybookConfig } from "@storybook/nextjs-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@chromatic-com/storybook", "@storybook/addon-vitest", "@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      image: {
        // Next.js image plugin이 svg를 먼저 가져가지 않도록 함
        excludeFiles: ["**/*.svg"],
      },
    },
  },
  staticDirs: ["../public"],
  async viteFinal(config) {
    config.plugins ??= [];

    config.plugins.push(
      svgr({
        include: "**/*.svg",
      }),
    );

    return config;
  },
};

export default config;
