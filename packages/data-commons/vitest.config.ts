import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    passWithNoTests: true,
    environment: "node",
    dir: "./src",
    reporters: ["verbose"],
    coverage: {
      provider: "v8",
      reportsDirectory: "./src/tests/coverage",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
