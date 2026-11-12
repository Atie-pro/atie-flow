export const LARGO_MINIMO_CONTRASENA = 8;
export const LARGO_MAXIMO_CONTRASENA = 128;

export type CampoCredencial = "correo" | "contrasena";

export type ErrorCredencial = {
  campo: CampoCredencial;
  mensaje: string;
};

export type ResultadoCredenciales =
  | { ok: true; correo: string }
  | { ok: false; errores: ErrorCredencial[] };

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarCorreo(correo: string): string | null {
  const normalizado = correo.trim().toLowerCase();
  if (!normalizado) return "Escribe el correo.";
  if (normalizado.length > 254 || !CORREO.test(normalizado)) {
    return "El correo no tiene un formato válido.";
  }
  return null;
}

export function validarContrasena(contrasena: string): string | null {
  if (!contrasena) return "Escribe la contraseña.";
  if (contrasena.length < LARGO_MINIMO_CONTRASENA) {
    return `La contraseña debe tener al menos ${LARGO_MINIMO_CONTRASENA} caracteres.`;
  }
  if (contrasena.length > LARGO_MAXIMO_CONTRASENA) {
    return "La contraseña es demasiado larga.";
  }
  return null;
}

export function validarCredenciales(entrada: {
  correo: string;
  contrasena: string;
}): ResultadoCredenciales {
  const errores: ErrorCredencial[] = [];
  const errorCorreo = validarCorreo(entrada.correo);
  const errorContrasena = validarContrasena(entrada.contrasena);
  if (errorCorreo) errores.push({ campo: "correo", mensaje: errorCorreo });
  if (errorContrasena) {
    errores.push({ campo: "contrasena", mensaje: errorContrasena });
  }
  if (errores.length > 0) return { ok: false, errores };
  return { ok: true, correo: entrada.correo.trim().toLowerCase() };
}
