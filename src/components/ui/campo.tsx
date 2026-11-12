import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  etiqueta: string;
  id: string;
};

export function Campo({ etiqueta, id, className = "", ...props }: Props) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-atie-azul">
        {etiqueta}
      </label>
      <input
        id={id}
        className={`w-full rounded-2xl border border-atie-gris/35 bg-white px-3.5 py-3 text-base text-atie-azul shadow-[inset_0_1px_0_rgba(13,44,86,0.03)] outline-none transition placeholder:text-atie-gris/80 focus:border-atie-cian focus:ring-4 focus:ring-atie-cian/20 ${className}`}
        {...props}
      />
    </div>
  );
}
