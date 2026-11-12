# Cómo contribuir

ATIE Flow es una herramienta interna. Los cambios entran por pull request hacia `main`.

## Ramas

- `main` se mantiene desplegable en cuanto haya hosting. No se commitea directo.
- Crea una rama corta en minúsculas, por ejemplo `sprint-1/proyectos` o `fix/clave-tarea`.
- Un pull request, un tema. Si el cambio necesita migración, inclúyela en el mismo PR.

## Pull request

1. Actualiza tu rama con `main`.
2. Completa la plantilla: qué cambia, cómo probarlo y los criterios de aceptación.
3. El CI (lint, tipos, migraciones y pruebas) tiene que quedar en verde.
4. Otro integrante del equipo revisa antes de integrar.

## Secretos

- No subas `.env`, contraseñas, tokens ni claves de proveedores.
- Lo único que va al repositorio es `.env.example`, con valores de desarrollo local.
- Si un secreto se coló en un commit, rótalo. Borrarlo del archivo no alcanza.

## Antes de pedir revisión

```bash
pnpm lint
pnpm typecheck
pnpm test
```

Si tocaste el inicio de sesión o una pantalla, corre también `pnpm test:e2e` con la base sembrada y el servidor disponible. Los pasos están en el README.
