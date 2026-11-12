import type { ButtonHTMLAttributes } from "react";

type Variante = "primario" | "secundario" | "fantasma";

const clases: Record<Variante, string> = {
  primario:
    "bg-atie-verde text-atie-azul hover:brightness-95 disabled:opacity-60",
  secundario:
    "border border-atie-azul/15 bg-white text-atie-azul hover:border-atie-cian",
  fantasma: "text-white/90 hover:bg-white/10 hover:text-white",
};

export function Boton({
  variante = "primario",
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold tracking-tight transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atie-cian disabled:cursor-not-allowed ${clases[variante]} ${className}`}
      {...props}
    />
  );
}
