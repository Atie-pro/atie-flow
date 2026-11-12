import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";
import {
  LARGO_MAXIMO_CONTRASENA,
  LARGO_MINIMO_CONTRASENA,
} from "@/lib/validacion";

function valor(nombre: string): string | undefined {
  const contenido = process.env[nombre]?.trim();
  return contenido ? contenido : undefined;
}

const googleId = valor("GOOGLE_CLIENT_ID");
const googleSecreto = valor("GOOGLE_CLIENT_SECRET");
const microsoftId = valor("MICROSOFT_CLIENT_ID");
const microsoftSecreto = valor("MICROSOFT_CLIENT_SECRET");

const urlBase = valor("BETTER_AUTH_URL") ?? "http://localhost:3000";

export const auth = betterAuth({
  appName: "ATIE Flow",
  baseURL: urlBase,
  secret: valor("BETTER_AUTH_SECRET"),
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: LARGO_MINIMO_CONTRASENA,
    maxPasswordLength: LARGO_MAXIMO_CONTRASENA,
  },
  socialProviders: {
    ...(googleId && googleSecreto
      ? { google: { clientId: googleId, clientSecret: googleSecreto } }
      : {}),
    ...(microsoftId && microsoftSecreto
      ? {
          microsoft: {
            clientId: microsoftId,
            clientSecret: microsoftSecreto,
          },
        }
      : {}),
  },
  trustedOrigins: [urlBase],
  rateLimit: {
    window: 60,
    max: 30,
  },
  advanced: {
    useSecureCookies: urlBase.startsWith("https://"),
  },
  plugins: [nextCookies()],
});
