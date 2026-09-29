import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.ui-skills.com",
  trailingSlash: "ignore",
  output: "server",
  session: false,
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node",
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0,
    },
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    optimizeDeps: {
      // Rebuild the dev cache after dependency/config changes, but do not force
      // an unnecessary optimizer pass during production builds.
      force: process.argv.includes("dev"),
      // These SSR imports are incompatible with Cloudflare's workerd optimizer.
      include: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-dom/client",
        "@base-ui/react",
      ],
      exclude: ["marked", "@astrojs/cloudflare/entrypoints/server"],
    },
    ssr: {
      external: ["node:fs", "node:path"],
    },
  },
});
