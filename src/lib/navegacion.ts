const TABLERO = "/tablero";

export function destinoTrasInicio(desde: string | null | undefined): string {
  if (!desde) return TABLERO;
  if (!desde.startsWith("/") || desde.startsWith("//") || desde.startsWith("/\\")) {
    return TABLERO;
  }
  if (desde.startsWith("/iniciar-sesion")) return TABLERO;
  if (desde.includes("://") || desde.includes("\\")) return TABLERO;
  return desde;
}
