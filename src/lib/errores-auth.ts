export function esFalloDeCredenciales(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const candidato = error as {
    status?: string | number;
    statusCode?: number;
  };
  if (
    candidato.statusCode === 400 ||
    candidato.statusCode === 401 ||
    candidato.statusCode === 403
  ) {
    return true;
  }
  return (
    candidato.status === "UNAUTHORIZED" ||
    candidato.status === "BAD_REQUEST" ||
    candidato.status === "FORBIDDEN" ||
    candidato.status === 400 ||
    candidato.status === 401 ||
    candidato.status === 403
  );
}
