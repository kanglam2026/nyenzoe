// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// CHANGE THESE ⬇️
const username = "YOUR_GITHUB_USERNAME";
const repo = "YOUR_REPO_NAME";

export default defineConfig({
  site: `https://${username}.github.io`,
  base: `/${repo}/`,
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});
