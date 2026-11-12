import { describe, expect, it } from "vitest";
import { esFalloDeCredenciales } from "./errores-auth";

describe("esFalloDeCredenciales", () => {
  it("reconoce el rechazo de Better Auth sin depender de la clase del error", () => {
    expect(
      esFalloDeCredenciales({
        status: "UNAUTHORIZED",
        statusCode: 401,
      }),
    ).toBe(true);
    expect(esFalloDeCredenciales({ statusCode: 400 })).toBe(true);
    expect(esFalloDeCredenciales({ status: "FORBIDDEN" })).toBe(true);
  });

  it("deja pasar fallos que no son de credenciales", () => {
    expect(esFalloDeCredenciales(null)).toBe(false);
    expect(esFalloDeCredenciales(new Error("base caída"))).toBe(false);
    expect(esFalloDeCredenciales({ statusCode: 500 })).toBe(false);
  });
});
