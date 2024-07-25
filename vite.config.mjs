import { defineConfig } from "vite";
import { resolve } from "path";
import autoprefixer from "autoprefixer";
import mqpacker from "@hail2u/css-mqpacker";
import cssnano from "cssnano";
import purgecss from "@fullhuman/postcss-purgecss";
import url from "postcss-url";

const isProduction = process.env.NODE_ENV === "production";

const postcssPlugins = [autoprefixer(), mqpacker(), cssnano()];

if (isProduction) {
  postcssPlugins.push(
    url({
      url: (asset) => {
        return asset.url.replace("/assets/", "../");
      },
    }),
    purgecss({
      content: ["./index.html"],
      css: ["./styles/general.scss", "./styles/index.scss"],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    })
  );
}

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {},
    },
    postcss: {
      plugins: postcssPlugins,
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./index.html"),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "assets/css/[name][extname]";
          }
          if (assetInfo.name.endsWith(".js")) {
            return "assets/js/[name][extname]";
          }
          // return "assets/js/[name][extname]";
        },
      },
    },
  },
});
