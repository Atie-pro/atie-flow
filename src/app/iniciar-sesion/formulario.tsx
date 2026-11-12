"use client";

import { useActionState } from "react";
import { Boton } from "@/components/ui/boton";
import { Campo } from "@/components/ui/campo";
import { iniciarSesion, type EstadoInicio } from "./acciones";

const estadoInicial: EstadoInicio = { error: null };

export function FormularioInicio({ desde }: { desde?: string }) {
  const [estado, accion, pendiente] = useActionState(
    iniciarSesion,
    estadoInicial,
  );

  return (
    <form action={accion} className="space-y-5" noValidate>
      {desde ? <input type="hidden" name="desde" value={desde} /> : null}
      <Campo
        id="correo"
        name="correo"
        etiqueta="Correo"
        type="email"
        autoComplete="username"
        inputMode="email"
        required
        placeholder="admin@atie.com.ec"
      />
      <Campo
        id="contrasena"
        name="contrasena"
        etiqueta="Contraseña"
        type="password"
        autoComplete="current-password"
        required
        minLength={8}
      />
      {estado.error ? (
        <p
          role="alert"
          className="rounded-2xl border border-atie-naranja/40 bg-atie-naranja/10 px-3 py-2 text-sm text-atie-azul"
        >
          {estado.error}
        </p>
      ) : null}
      <Boton type="submit" className="w-full" disabled={pendiente} aria-busy={pendiente}>
        {pendiente ? "Entrando…" : "Entrar"}
      </Boton>
    </form>
  );
}
