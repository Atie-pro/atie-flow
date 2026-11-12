import type { Metadata } from "next";
import { MarcaAtie } from "@/components/marca";
import { Boton } from "@/components/ui/boton";
import { Tarjeta } from "@/components/ui/tarjeta";
import { exigirSesion } from "@/servidor/sesion";
import { cargarTablero } from "@/servidor/tablero";
import { cerrarSesion } from "./acciones";

export const metadata: Metadata = {
  title: "Tablero",
};

const ETIQUETA_ROL = {
  ADMIN: "Administración",
  MIEMBRO: "Miembro",
} as const;

export default async function PaginaTablero() {
  const sesion = await exigirSesion();
  const membresia = await cargarTablero(sesion.user.id);
  const organizacion = membresia?.organization;
  const proyectos = organizacion?.projects ?? [];
  const plantilla = organizacion?.workflowTemplates[0];
  const etapas = plantilla?.stages ?? [];

  return (
    <div className="min-h-full bg-atie-papel">
      <header className="border-b border-white/10 bg-atie-azul text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="/tablero" className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-atie-cian">
            <MarcaAtie tono="claro" />
          </a>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{sesion.user.name}</p>
              <p className="text-xs text-white/70">{sesion.user.email}</p>
            </div>
            <form action={cerrarSesion}>
              <Boton type="submit" variante="fantasma">
                Cerrar sesión
              </Boton>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-atie-cian uppercase">
              {organizacion?.name ?? "ATIE"}
              {membresia ? ` · ${ETIQUETA_ROL[membresia.role]}` : ""}
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-atie-azul">
              Tablero
            </h1>
          </div>
          <p className="font-display text-lg text-atie-azul italic">
            Conectamos el futuro
          </p>
        </div>

        {proyectos.length === 0 ? (
          <Tarjeta className="px-6 py-10 sm:px-10">
            <p className="text-xs font-semibold tracking-[0.18em] text-atie-naranja uppercase">
              Sin proyectos
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-atie-azul">
              No hay proyectos todavía.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-atie-gris">
              El tablero de {organizacion?.name ?? "ATIE"} está listo. Cuando
              exista el primero, aparecerá aquí y recorrerá el flujo por etapas.
            </p>
            {etapas.length > 0 ? (
              <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
                {etapas.map((etapa) => (
                  <li
                    key={etapa.id}
                    className="rounded-2xl border border-atie-azul/10 bg-atie-papel px-3 py-3"
                  >
                    <span className="text-xs font-semibold text-atie-cian">
                      {String(etapa.position).padStart(2, "0")}
                    </span>
                    <p className="mt-1 text-sm font-semibold text-atie-azul">
                      {etapa.name}
                    </p>
                  </li>
                ))}
              </ol>
            ) : null}
            {plantilla ? (
              <p className="mt-6 text-xs text-atie-gris">
                Plantilla lista: {plantilla.name}
              </p>
            ) : null}
          </Tarjeta>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {proyectos.map((proyecto) => (
              <li key={proyecto.id}>
                <Tarjeta className="px-5 py-5">
                  <h2 className="text-lg font-semibold text-atie-azul">
                    {proyecto.name}
                  </h2>
                </Tarjeta>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
