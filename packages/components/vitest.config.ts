import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["src/index.tsx"],
      include: ["src/**/*.tsx"],
    },
  },
});
