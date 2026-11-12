// Cliente de Better Auth para el navegador. El inicio de sesión actual
// usa una acción de servidor; este módulo queda listo para Google o Microsoft.
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { signIn, signOut, useSession } = authClient;
