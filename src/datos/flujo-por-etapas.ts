export type ItemDeLista = {
  titulo: string;
  obligatorio: boolean;
};

export type EtapaPlantilla = {
  nombre: string;
  slug: string;
  descripcion: string;
  items: ItemDeLista[];
};

export const FLUJO_ATIE = {
  slug: "flujo-atie",
  nombre: "Flujo ATIE",
  descripcion: "De la idea al cierre, con una puerta de aprobación entre etapas.",
  etapas: [
    {
      nombre: "Idea",
      slug: "idea",
      descripcion: "Definir el problema y por qué vale la pena.",
      items: [
        { titulo: "Problema u oportunidad descritos", obligatorio: true },
        { titulo: "Hipótesis de valor", obligatorio: true },
        { titulo: "Interesados identificados", obligatorio: true },
      ],
    },
    {
      nombre: "Requisitos",
      slug: "requisitos",
      descripcion: "Acordar qué se va a construir y cómo se acepta.",
      items: [
        { titulo: "Alcance acordado", obligatorio: true },
        { titulo: "Criterios de aceptación", obligatorio: true },
        { titulo: "Restricciones y dependencias", obligatorio: true },
      ],
    },
    {
      nombre: "Diseño",
      slug: "diseno",
      descripcion: "Dejar listos los flujos y las decisiones de experiencia.",
      items: [
        { titulo: "Flujos principales", obligatorio: true },
        { titulo: "Criterios de experiencia", obligatorio: true },
        { titulo: "Decisiones técnicas registradas", obligatorio: true },
      ],
    },
    {
      nombre: "Desarrollo",
      slug: "desarrollo",
      descripcion: "Implementar, revisar y cubrir con pruebas.",
      items: [
        { titulo: "Implementación completa", obligatorio: true },
        { titulo: "Revisión de código", obligatorio: true },
        { titulo: "Pruebas unitarias en verde", obligatorio: true },
      ],
    },
    {
      nombre: "QA",
      slug: "qa",
      descripcion: "Comprobar que lo construido se puede entregar.",
      items: [
        { titulo: "Plan de pruebas ejecutado", obligatorio: true },
        { titulo: "Defectos críticos cerrados", obligatorio: true },
        { titulo: "Regresión aceptada", obligatorio: true },
      ],
    },
    {
      nombre: "Despliegue",
      slug: "despliegue",
      descripcion: "Salir a producción con un plan y monitoreo.",
      items: [
        { titulo: "Plan de salida", obligatorio: true },
        { titulo: "Migraciones aplicadas", obligatorio: true },
        { titulo: "Monitoreo verificado", obligatorio: true },
      ],
    },
    {
      nombre: "Cierre",
      slug: "cierre",
      descripcion: "Cerrar el trabajo y guardar lo aprendido.",
      items: [
        { titulo: "Aceptación registrada", obligatorio: true },
        { titulo: "Documentación entregada", obligatorio: true },
        { titulo: "Lecciones aprendidas", obligatorio: true },
      ],
    },
  ],
} as const satisfies {
  slug: string;
  nombre: string;
  descripcion: string;
  etapas: readonly EtapaPlantilla[];
};
