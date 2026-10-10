import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    env: {
      DATABASE_URL: "mysql://root:admin@localhost:3306/teste_receitas_rg_sistemas_test",
      JWT_SECRET: "secret",
      NODE_ENV: "test",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
