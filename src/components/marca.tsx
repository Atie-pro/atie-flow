type Tono = "claro" | "oscuro";

export function MarcaAtie({ tono = "oscuro" }: { tono?: Tono }) {
  const base = tono === "claro" ? "text-white" : "text-atie-azul";
  const flow = tono === "claro" ? "text-atie-cian" : "text-atie-verde";

  return (
    <span className={`inline-flex items-baseline gap-2 font-semibold tracking-tight ${base}`}>
      <span className="text-xl leading-none">ATIE</span>
      <span className={`text-xl font-medium leading-none ${flow}`}>Flow</span>
    </span>
  );
}
