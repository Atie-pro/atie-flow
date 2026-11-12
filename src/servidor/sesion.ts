import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function obtenerSesion() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function exigirSesion() {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/iniciar-sesion");
  return sesion;
}
