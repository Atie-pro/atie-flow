import type { HTMLAttributes } from "react";

export function Tarjeta({
  className = "",
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={`rounded-[1.75rem] border border-atie-azul/10 bg-white shadow-[0_24px_60px_-36px_rgba(13,44,86,0.55)] ${className}`}
      {...props}
    />
  );
}
