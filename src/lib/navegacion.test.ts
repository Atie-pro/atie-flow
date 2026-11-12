import { describe, expect, it } from "vitest";
import { destinoTrasInicio } from "./navegacion";

describe("destinoTrasInicio", () => {
  it("vuelve al tablero cuando el destino no es una ruta interna", () => {
    expect(destinoTrasInicio(null)).toBe("/tablero");
    expect(destinoTrasInicio("")).toBe("/tablero");
    expect(destinoTrasInicio("https://ejemplo.test")).toBe("/tablero");
    expect(destinoTrasInicio("//ejemplo.test")).toBe("/tablero");
    expect(destinoTrasInicio("/iniciar-sesion")).toBe("/tablero");
    expect(destinoTrasInicio("/\\servidor")).toBe("/tablero");
  });

  it("conserva una ruta interna", () => {
    expect(destinoTrasInicio("/tablero")).toBe("/tablero");
    expect(destinoTrasInicio("/proyectos/atie")).toBe("/proyectos/atie");
  });
});
