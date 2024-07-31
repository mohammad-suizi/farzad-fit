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
      content: [
        "./index.html",
        "./blog-archive.html",
        "./product-archive.html",
        "./page.html",
      ],
      css: [
        "./styles/general.scss",
        "./styles/pages/index.scss",
        "./styles/pages/blog-archive.scss",
        "./styles/pages/page.scss",
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    })
  );
}

export default defineConfig({
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./index.html"),
        "blog-archive": resolve(__dirname, "./blog-archive.html"),
        "product-archive": resolve(__dirname, "./product-archive.html"),
        page: resolve(__dirname, "./page.html"),
      },
      output: {
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name][extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
});
