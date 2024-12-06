/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/project2/",
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: ["./setupTest.ts"],
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.tsx", "src/**/*.ts"],
      exclude: ["node_modules", "dist", "tests", "setupTest.ts", "**/*.stories.*"],
      all: true,
    },
  },
});
