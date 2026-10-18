import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base: the same build works at miabeckercooper.github.io and at /<repo-name>/.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    target: "es2022",
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1600,
  },
});
