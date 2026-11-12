import type { Metadata } from "next";
import { MarcaAtie } from "@/components/marca";
import { Tarjeta } from "@/components/ui/tarjeta";
import { obtenerSesion } from "@/servidor/sesion";
import { redirect } from "next/navigation";
import { destinoTrasInicio } from "@/lib/navegacion";
import { FormularioInicio } from "./formulario";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default async function PaginaInicio({
  searchParams,
}: {
  searchParams: Promise<{ desde?: string }>;
}) {
  const sesion = await obtenerSesion();
  const parametros = await searchParams;
  if (sesion) {
    redirect(destinoTrasInicio(parametros.desde));
  }

  return (
    <main className="grid min-h-full lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]">
      <section className="relative isolate overflow-hidden bg-atie-azul px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 18%, rgba(0,180,216,0.38), transparent 26%), radial-gradient(circle at 88% 86%, rgba(0,179,136,0.32), transparent 30%), linear-gradient(155deg, transparent 42%, rgba(255,140,66,0.22) 42.2%, transparent 42.7%)",
          }}
        />
        <div className="relative flex h-full min-h-[16rem] flex-col justify-between gap-12">
          <MarcaAtie tono="claro" />
          <div className="max-w-xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.22em] text-atie-cian uppercase">
              Ecuador · equipo interno
            </p>
            <h1 className="font-display text-5xl leading-[0.95] font-medium text-balance text-white italic sm:text-6xl">
              Conectamos el futuro
            </h1>
            <p className="max-w-md text-base leading-7 text-white/80">
              ATIE Flow ordena los proyectos de la idea al cierre: etapas,
              checklists y una puerta antes de seguir.
            </p>
          </div>
          <p className="text-sm text-white/70">
            <a
              href="https://atie.com.ec"
              className="text-atie-cian underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              atie.com.ec
            </a>
          </p>
        </div>
      </section>

      <section className="flex items-center bg-atie-papel px-5 py-12 sm:px-8">
        <Tarjeta className="mx-auto w-full max-w-md px-6 py-8 sm:px-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-atie-gris uppercase">
            Acceso interno
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-atie-azul">
            Iniciar sesión
          </h2>
          <p className="mt-2 mb-7 text-sm leading-6 text-atie-gris">
            El registro público está cerrado. Entra con la cuenta de tu equipo.
          </p>
          <FormularioInicio desde={parametros.desde} />
        </Tarjeta>
      </section>
    </main>
  );
}
