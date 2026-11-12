const NOMBRES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

export function leerTokenSesion(
  cookieHeader: string | null | undefined,
): string | null {
  if (!cookieHeader) return null;

  for (const parte of cookieHeader.split(";")) {
    const limpio = parte.trim();
    const igual = limpio.indexOf("=");
    if (igual <= 0) continue;
    const nombre = limpio.slice(0, igual);
    if (!NOMBRES.includes(nombre)) continue;
    const valor = limpio.slice(igual + 1);
    if (!valor) return null;
    try {
      return decodeURIComponent(valor);
    } catch {
      return valor;
    }
  }

  return null;
}
