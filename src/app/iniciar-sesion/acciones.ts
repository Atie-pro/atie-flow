"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { esFalloDeCredenciales } from "@/lib/errores-auth";
import { destinoTrasInicio } from "@/lib/navegacion";
import { validarCredenciales } from "@/lib/validacion";

export type EstadoInicio = {
  error: string | null;
};

export async function iniciarSesion(
  _estado: EstadoInicio,
  formulario: FormData,
): Promise<EstadoInicio> {
  const validacion = validarCredenciales({
    correo: String(formulario.get("correo") ?? ""),
    contrasena: String(formulario.get("contrasena") ?? ""),
  });

  if (!validacion.ok) {
    return {
      error: validacion.errores.map((error) => error.mensaje).join(" "),
    };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: validacion.correo,
        password: String(formulario.get("contrasena") ?? ""),
      },
      headers: await headers(),
    });
  } catch (error) {
    if (esFalloDeCredenciales(error)) {
      return { error: "Correo o contraseña incorrectos." };
    }
    throw error;
  }

  const desde = formulario.get("desde");
  redirect(destinoTrasInicio(typeof desde === "string" ? desde : null));
}
