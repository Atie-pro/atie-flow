## Qué cambia

<!-- Resume el cambio en una o dos frases. -->

## Por qué

<!-- Qué problema del flujo de ATIE resuelve. -->

## Cómo probarlo

1.
2.

## Criterios de aceptación

- [ ] Un usuario interno puede completar el flujo que describe este PR
- [ ] El texto visible de la interfaz está en español
- [ ] No se introducen secretos ni credenciales reales

## Checklist

- [ ] La documentación nueva (README, comentarios de uso, plantillas) está en español
- [ ] `.env.example` sigue sin secretos reales; no se commiteó `.env`
- [ ] Si cambia el modelo, la migración de Prisma está en el PR
- [ ] `pnpm lint`, `pnpm typecheck` y `pnpm test` pasan en local
- [ ] El CI de GitHub Actions está en verde
