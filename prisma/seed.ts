import "dotenv/config";
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { FLUJO_ATIE } from "../src/datos/flujo-por-etapas";
import { ORGANIZACION_ATIE } from "../src/datos/organizacion-atie";
import { prisma } from "../src/lib/prisma";

function requerido(nombre: string): string {
  const valor = process.env[nombre]?.trim();
  if (!valor) {
    throw new Error(
      `Falta ${nombre}. Copia .env.example a .env antes de sembrar la base.`,
    );
  }
  return valor;
}

async function sembrarUsuario(): Promise<string> {
  const email = requerido("SEED_ADMIN_EMAIL").toLowerCase();
  const name = requerido("SEED_ADMIN_NAME");
  const password = requerido("SEED_ADMIN_PASSWORD");
  const hash = await hashPassword(password);

  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) {
    await prisma.user.update({
      where: { id: existente.id },
      data: { name, emailVerified: true },
    });
    const actualizadas = await prisma.account.updateMany({
      where: { userId: existente.id, providerId: "credential" },
      data: { password: hash },
    });
    if (actualizadas.count === 0) {
      await prisma.account.create({
        data: {
          id: randomUUID(),
          accountId: existente.id,
          providerId: "credential",
          userId: existente.id,
          password: hash,
        },
      });
    }
    return existente.id;
  }

  const id = randomUUID();
  await prisma.user.create({
    data: {
      id,
      name,
      email,
      emailVerified: true,
      accounts: {
        create: {
          id: randomUUID(),
          accountId: id,
          providerId: "credential",
          password: hash,
        },
      },
    },
  });
  return id;
}

async function main() {
  const userId = await sembrarUsuario();

  const organizacion = await prisma.organization.upsert({
    where: { slug: ORGANIZACION_ATIE.slug },
    update: {
      name: ORGANIZACION_ATIE.nombre,
      taskPrefix: ORGANIZACION_ATIE.prefijoTareas,
    },
    create: {
      name: ORGANIZACION_ATIE.nombre,
      slug: ORGANIZACION_ATIE.slug,
      taskPrefix: ORGANIZACION_ATIE.prefijoTareas,
    },
  });

  await prisma.membership.upsert({
    where: {
      userId_organizationId: {
        userId,
        organizationId: organizacion.id,
      },
    },
    update: { role: "ADMIN" },
    create: {
      userId,
      organizationId: organizacion.id,
      role: "ADMIN",
    },
  });

  const plantillaExistente = await prisma.workflowTemplate.findUnique({
    where: {
      organizationId_slug: {
        organizationId: organizacion.id,
        slug: FLUJO_ATIE.slug,
      },
    },
  });

  if (!plantillaExistente) {
    await prisma.workflowTemplate.create({
      data: {
        organizationId: organizacion.id,
        slug: FLUJO_ATIE.slug,
        name: FLUJO_ATIE.nombre,
        description: FLUJO_ATIE.descripcion,
        isDefault: true,
        stages: {
          create: FLUJO_ATIE.etapas.map((etapa, indice) => ({
            name: etapa.nombre,
            slug: etapa.slug,
            description: etapa.descripcion,
            position: indice + 1,
            items: {
              create: etapa.items.map((item, itemIndice) => ({
                title: item.titulo,
                position: itemIndice + 1,
                required: item.obligatorio,
              })),
            },
          })),
        },
      },
    });
  }

  const yaRegistrada = await prisma.auditEvent.count({
    where: {
      organizationId: organizacion.id,
      action: "semilla.inicial",
    },
  });
  if (yaRegistrada === 0) {
    await prisma.auditEvent.create({
      data: {
        organizationId: organizacion.id,
        actorId: userId,
        action: "semilla.inicial",
        entityType: "Organization",
        entityId: organizacion.id,
        metadata: { plantilla: FLUJO_ATIE.slug },
      },
    });
  }

  console.log(
    `Semilla lista. Organización ${organizacion.name}, usuario ${requerido("SEED_ADMIN_EMAIL")}.`,
  );
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
