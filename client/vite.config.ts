import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import VueRouter from "unplugin-vue-router/vite";
import Layouts from "vite-plugin-vue-layouts";
import AutoImport from "unplugin-auto-import/vite";
import Tailwindcss from "@tailwindcss/vite";
import { unheadVueComposablesImports } from "@unhead/vue";
import { VueRouterAutoImports } from "unplugin-vue-router";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  plugins: [
    VueRouter({
      dts: "src/typed-router.d.ts",
    }),
    Layouts(),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/],
      imports: ["vue", unheadVueComposablesImports, VueRouterAutoImports],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/stores"],
      vueTemplate: true,
    }),
    Vue(),
    VueDevTools(),
    Tailwindcss(),
  ],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
