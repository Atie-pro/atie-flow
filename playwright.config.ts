import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

const enCi = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: enCi,
  retries: enCi ? 1 : 0,
  workers: 1,
  reporter: enCi ? "github" : "list",
  use: {
    baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: enCi ? "pnpm start" : "pnpm dev",
    url: "http://localhost:3000/iniciar-sesion",
    reuseExistingServer: !enCi,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
