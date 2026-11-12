import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const conexion = process.env.DATABASE_URL;

if (!conexion) {
  throw new Error(
    "Falta DATABASE_URL. Copia .env.example a .env antes de levantar la aplicación.",
  );
}

const globalParaPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalParaPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(conexion),
  });

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.prisma = prisma;
}
