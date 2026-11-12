import { describe, expect, it } from "vitest";
import {
  LARGO_MAXIMO_CONTRASENA,
  LARGO_MINIMO_CONTRASENA,
  validarContrasena,
  validarCorreo,
  validarCredenciales,
} from "./validacion";

describe("validarCredenciales", () => {
  it("normaliza el correo cuando los datos sirven para entrar", () => {
    const resultado = validarCredenciales({
      correo: "  Admin@ATIE.com.ec ",
      contrasena: "atie-dev-cambiar",
    });
    expect(resultado).toEqual({ ok: true, correo: "admin@atie.com.ec" });
  });

  it("junta los errores de correo y contraseña", () => {
    const resultado = validarCredenciales({
      correo: "sin-arroba",
      contrasena: "corta",
    });
    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.errores.map((error) => error.campo)).toEqual([
        "correo",
        "contrasena",
      ]);
    }
  });

  it("exige correo y una contraseña dentro del largo permitido", () => {
    expect(validarCorreo("")).toBe("Escribe el correo.");
    expect(validarCorreo("a@b")).toMatch(/formato/);
    expect(validarContrasena("")).toBe("Escribe la contraseña.");
    expect(validarContrasena("a".repeat(LARGO_MINIMO_CONTRASENA - 1))).toMatch(
      /al menos/,
    );
    expect(validarContrasena("a".repeat(LARGO_MAXIMO_CONTRASENA + 1))).toMatch(
      /demasiado larga/,
    );
    expect(validarContrasena("a".repeat(LARGO_MINIMO_CONTRASENA))).toBeNull();
  });
});
