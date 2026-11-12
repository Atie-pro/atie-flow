const PREFIJO = /^[A-Z][A-Z0-9]{1,9}$/;

export class ClaveTareaInvalida extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "ClaveTareaInvalida";
  }
}

export function formatearClaveTarea(prefijo: string, numero: number): string {
  if (!PREFIJO.test(prefijo)) {
    throw new ClaveTareaInvalida(
      "El prefijo debe tener de 2 a 10 letras o números en mayúsculas.",
    );
  }
  if (!Number.isInteger(numero) || numero < 1) {
    throw new ClaveTareaInvalida(
      "El número de tarea debe ser un entero mayor que cero.",
    );
  }
  return `${prefijo}-${numero}`;
}

export function asignarClaveTarea(organizacion: {
  taskPrefix: string;
  nextTaskNumber: number;
}): { clave: string; numero: number; nextTaskNumber: number } {
  const numero = organizacion.nextTaskNumber;
  return {
    clave: formatearClaveTarea(organizacion.taskPrefix, numero),
    numero,
    nextTaskNumber: numero + 1,
  };
}

export function parsearClaveTarea(
  clave: string,
): { prefijo: string; numero: number } | null {
  const coincidencia = /^([A-Z][A-Z0-9]{1,9})-([1-9]\d*)$/.exec(clave);
  if (!coincidencia) return null;
  const prefijo = coincidencia[1];
  const numeroTexto = coincidencia[2];
  if (!prefijo || !numeroTexto) return null;
  return { prefijo, numero: Number(numeroTexto) };
}
