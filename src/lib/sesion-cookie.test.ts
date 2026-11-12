import { describe, expect, it } from "vitest";
import { leerTokenSesion } from "./sesion-cookie";

describe("leerTokenSesion", () => {
  it("lee la cookie de sesión de Better Auth", () => {
    expect(leerTokenSesion(null)).toBeNull();
    expect(leerTokenSesion("otra=1")).toBeNull();
    expect(
      leerTokenSesion("tema=claro; better-auth.session_token=abc123"),
    ).toBe("abc123");
    expect(
      leerTokenSesion("__Secure-better-auth.session_token=seguro"),
    ).toBe("seguro");
  });

  it("ignora una cookie vacía y decodifica el valor", () => {
    expect(leerTokenSesion("better-auth.session_token=")).toBeNull();
    expect(leerTokenSesion("better-auth.session_token=a%2Fb")).toBe("a/b");
  });
});
