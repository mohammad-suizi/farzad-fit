import { defineConfig } from "vite";
import { resolve } from "path";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import purgecss from "@fullhuman/postcss-purgecss";

const isProduction = process.env.NODE_ENV === "production";

const postcssPlugins = [autoprefixer(), cssnano()];

if (isProduction) {
  postcssPlugins.push(
    purgecss({
      content: [
        "./blog-archive.html",
        "./blog-single.html",
        "./index.html",
        "./page-404.html",
        "./page-plan.html",
        "./page-search.html",
        "./page-woocommerce.html",
        "./page.html",
        "./product-archive.html",
        "./product-single.html",
      ],
      css: [
        "./styles/general.scss",
        "./styles/pages/blog-archive.scss",
        "./styles/pages/blog-single.scss",
        "./styles/pages/index.scss",
        "./styles/pages/page-404.scss",
        "./styles/pages/page-plan.scss",
        "./styles/pages/page-search.scss",
        "./styles/pages/page-woocommerce.scss",
        "./styles/pages/page.scss",
        "./styles/pages/product-archive.scss",
        "./styles/pages/product-single.scss",
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    })
  );
}

export default defineConfig({
  base: "./",
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
  },
  build: {
    rollupOptions: {
      input: {
        "blog-archive-html": resolve(__dirname, "./blog-archive.html"),
        "blog-single-html": resolve(__dirname, "./blog-single.html"),
        "index-html": resolve(__dirname, "./index.html"),
        "page-404-html": resolve(__dirname, "./page-404.html"),
        "page-plan-html": resolve(__dirname, "./page-plan.html"),
        "page-search-html": resolve(__dirname, "./page-search.html"),
        "page-woocommerce-html": resolve(__dirname, "./page-woocommerce.html"),
        "page-html": resolve(__dirname, "./page.html"),
        "product-archive-html": resolve(__dirname, "./product-archive.html"),
        "product-single-html": resolve(__dirname, "./product-single.html"),
      },
      output: {
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name][extname]";
          } else if (/\.js$/.test(name ?? "")) {
            return "assets/js/[name][extname]";
          }
        },
      },
    },
  },
});
