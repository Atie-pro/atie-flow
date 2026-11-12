import { describe, expect, it } from "vitest";
import {
  ClaveTareaInvalida,
  asignarClaveTarea,
  formatearClaveTarea,
  parsearClaveTarea,
} from "./clave-tarea";

describe("formatearClaveTarea", () => {
  it("arma el identificador legible de la organización", () => {
    expect(formatearClaveTarea("ATIE", 123)).toBe("ATIE-123");
    expect(formatearClaveTarea("ATIE", 1)).toBe("ATIE-1");
  });

  it("rechaza prefijos y números que no se pueden guardar", () => {
    expect(() => formatearClaveTarea("atie", 1)).toThrow(ClaveTareaInvalida);
    expect(() => formatearClaveTarea("A", 1)).toThrow(ClaveTareaInvalida);
    expect(() => formatearClaveTarea("ATIE", 0)).toThrow(ClaveTareaInvalida);
    expect(() => formatearClaveTarea("ATIE", -3)).toThrow(ClaveTareaInvalida);
    expect(() => formatearClaveTarea("ATIE", 1.5)).toThrow(ClaveTareaInvalida);
  });
});

describe("asignarClaveTarea", () => {
  it("reserva el número actual y deja el siguiente listo", () => {
    const organizacion = { taskPrefix: "ATIE", nextTaskNumber: 1 };
    const primera = asignarClaveTarea(organizacion);
    expect(primera).toEqual({
      clave: "ATIE-1",
      numero: 1,
      nextTaskNumber: 2,
    });
    expect(organizacion.nextTaskNumber).toBe(1);

    const segunda = asignarClaveTarea({
      taskPrefix: "ATIE",
      nextTaskNumber: primera.nextTaskNumber,
    });
    expect(segunda.clave).toBe("ATIE-2");
    expect(segunda.numero).toBe(2);
  });
});

describe("parsearClaveTarea", () => {
  it("recupera prefijo y número, y descarta formatos ajenos", () => {
    expect(parsearClaveTarea("ATIE-123")).toEqual({
      prefijo: "ATIE",
      numero: 123,
    });
    expect(parsearClaveTarea(formatearClaveTarea("ATIE", 8))).toEqual({
      prefijo: "ATIE",
      numero: 8,
    });
    expect(parsearClaveTarea("ATIE-01")).toBeNull();
    expect(parsearClaveTarea("atie-1")).toBeNull();
    expect(parsearClaveTarea("ATIE")).toBeNull();
    expect(parsearClaveTarea("ATIE-1-2")).toBeNull();
  });
});
