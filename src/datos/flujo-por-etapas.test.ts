import { describe, expect, it } from "vitest";
import { FLUJO_ATIE } from "./flujo-por-etapas";

describe("FLUJO_ATIE", () => {
  it("define las siete etapas en orden, cada una con checklist", () => {
    expect(FLUJO_ATIE.etapas.map((etapa) => etapa.slug)).toEqual([
      "idea",
      "requisitos",
      "diseno",
      "desarrollo",
      "qa",
      "despliegue",
      "cierre",
    ]);
    expect(FLUJO_ATIE.etapas.map((etapa) => etapa.nombre)).toEqual([
      "Idea",
      "Requisitos",
      "Diseño",
      "Desarrollo",
      "QA",
      "Despliegue",
      "Cierre",
    ]);
    for (const etapa of FLUJO_ATIE.etapas) {
      expect(etapa.items.length).toBeGreaterThan(0);
      expect(etapa.descripcion.length).toBeGreaterThan(0);
    }
  });
});
