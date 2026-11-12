import "dotenv/config";
import { defineConfig } from "prisma/config";

const urlLocal =
  "postgresql://atie:atie@localhost:5432/atie_flow";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? urlLocal,
  },
});
