import { prisma } from "@/lib/prisma";

export async function cargarTablero(userId: string) {
  return prisma.membership.findFirst({
    where: { userId },
    orderBy: { createdAt: "asc" },
    include: {
      organization: {
        include: {
          projects: {
            orderBy: { name: "asc" },
            select: { id: true, name: true, slug: true },
          },
          workflowTemplates: {
            where: { isDefault: true },
            orderBy: { createdAt: "asc" },
            take: 1,
            include: {
              stages: {
                orderBy: { position: "asc" },
                select: { id: true, name: true, position: true, slug: true },
              },
            },
          },
        },
      },
    },
  });
}
