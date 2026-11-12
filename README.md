# ATIE Flow

Herramienta interna de ATIE ([atie.com.ec](https://atie.com.ec)) para llevar proyectos de la idea al cierre. El estilo de trabajo se parece a un tablero con páginas, y el recorrido es por etapas: idea, requisitos, diseño, desarrollo, QA, despliegue y cierre. Cada etapa tendrá checklist y una puerta de aprobación. Más adelante se conecta con GitHub.

Este repositorio es el sprint 0: cimientos. Hay inicio de sesión para el equipo interno y un tablero vacío con la identidad de ATIE. Todavía no se crean proyectos desde la interfaz.

Supuestos de trabajo, reversibles cuando el equipo los confirme: el MVP es solo para el equipo interno, el nombre de trabajo es `atie-flow` y el hosting todavía no está decidido. No hay despliegue en este sprint.

## Requisitos

- Node.js 22 o superior (`node -v`)
- pnpm 10 (`corepack enable` y luego `corepack prepare pnpm@10.33.4 --activate`, o el pnpm que ya traiga el entorno)
- Docker, con el comando `docker compose`

## Levantar el entorno

Todos los comandos se corren en la raíz del repositorio.

1. Clona el repositorio y entra en la carpeta.

   ```bash
   git clone https://github.com/Atie-pro/atie-flow.git
   cd atie-flow
   ```

2. Instala las dependencias. Al terminar, el `postinstall` genera el cliente de Prisma.

   ```bash
   pnpm install
   ```

3. Crea el archivo de entorno local. Los valores de ejemplo alcanzan para desarrollar: no hace falta inventar un secreto para el primer arranque. Son credenciales de tu máquina, no de producción.

   ```bash
   cp .env.example .env
   ```

   Si más adelante quieres un secreto distinto, reemplaza `BETTER_AUTH_SECRET` por la salida de `openssl rand -base64 32` y reinicia el servidor.

4. Levanta PostgreSQL 16.

   ```bash
   docker compose up -d
   ```

   Espera a que el servicio esté sano:

   ```bash
   docker compose ps
   ```

   La columna de estado debe decir `healthy`. El usuario, la contraseña y la base son `atie` / `atie` / `atie_flow`, en el puerto `5432`. Coinciden con `DATABASE_URL` de `.env.example`. Si ya tienes otro Postgres en ese puerto, deténlo o cambia el puerto en `docker-compose.yml` y en `DATABASE_URL` a la vez.

5. Aplica las migraciones que ya están en el repositorio.

   ```bash
   pnpm db:deploy
   ```

6. Carga la organización ATIE, el usuario administrador y la plantilla de siete etapas.

   ```bash
   pnpm db:seed
   ```

   La semilla es idempotente. Si cambias `SEED_ADMIN_PASSWORD` en `.env`, vuelve a correr este comando para que el hash coincida.

7. Arranca la aplicación.

   ```bash
   pnpm dev
   ```

8. Abre [http://localhost:3000](http://localhost:3000). Te lleva al inicio de sesión. Entra con el correo y la contraseña de `.env`:

   - Correo: `admin@atie.com.ec`
   - Contraseña: `atie-dev-cambiar`

   Después del ingreso ves el tablero vacío, con la marca ATIE y la plantilla de etapas lista. El registro público está cerrado.

Para detener la base: `docker compose down`. Los datos quedan en el volumen de Docker. `docker compose down -v` borra ese volumen.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo en el puerto 3000 |
| `pnpm build` | Genera el cliente de Prisma y compila Next.js |
| `pnpm start` | Sirve la compilación de producción |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Genera tipos de Next.js y corre `tsc --noEmit` |
| `pnpm test` | Pruebas unitarias con Vitest |
| `pnpm test:watch` | Vitest en modo observación |
| `pnpm test:e2e` | Prueba de extremo a extremo del inicio de sesión |
| `pnpm db:deploy` | Aplica migraciones existentes |
| `pnpm db:migrate` | Crea una migración nueva durante el desarrollo |
| `pnpm db:seed` | Siembra organización, admin y plantilla |
| `pnpm db:studio` | Abre Prisma Studio |
| `pnpm db:generate` | Regenera el cliente de Prisma |

## Pruebas

Unitarias, sin base de datos:

```bash
pnpm test
```

Cubren la validación de correo y contraseña, el generador de identificadores `ATIE-123` y la plantilla de siete etapas.

La prueba de extremo a extremo necesita la base migrada y sembrada, y Chromium:

```bash
pnpm exec playwright install --with-deps chromium
pnpm test:e2e
```

En local, Playwright levanta `pnpm dev` si no hay un servidor en el puerto 3000. En CI usa la compilación de `pnpm build` y `pnpm start`.

## Estructura

```text
src/app            rutas: inicio de sesión, tablero y API de auth
src/components     marca ATIE y componentes base (botón, campo, tarjeta)
src/datos          organización y plantilla de flujo que usa la semilla
src/lib            Prisma, Better Auth, validación y claves de tarea
src/middleware.ts  protege las rutas según la cookie de sesión
src/servidor       sesión y consulta del tablero
prisma             esquema, migraciones y semilla
e2e                Playwright
.github            CI y plantilla de pull request
```

La protección de rutas está en `src/middleware.ts`: sin cookie de sesión, cualquier página que no sea el inicio de sesión redirige a `/iniciar-sesion`. La página del tablero vuelve a comprobar la sesión en el servidor. Next.js 16 marca el archivo `middleware` como obsoleto en favor de `proxy.ts`; en este sprint se mantiene el nombre porque el comportamiento es el mismo y el aviso no rompe la compilación.

## Decisiones de este sprint

- **Autenticación:** [Better Auth](https://better-auth.com) con correo y contraseña. El hash lo calcula la librería (scrypt). El registro público está apagado (`disableSignUp`). La tabla `Account` ya distingue el proveedor, así que Google o Microsoft se activan con variables de entorno, sin cambiar de librería ni de modelo. Esas variables están vacías en `.env.example` y no hay botones sociales hasta que existan credenciales.
- **Datos:** Prisma 7 con el adaptador de `pg` y PostgreSQL 16. Prisma 8 todavía no expone el cliente que Better Auth necesita.
- **Cookies en local:** la cookie de sesión solo se marca `Secure` si `BETTER_AUTH_URL` empieza por `https://`. Así `pnpm start` funciona en `http://localhost`.
- **Identificadores de tarea:** `Organization.taskPrefix` + contador `nextTaskNumber`, formato `ATIE-123`, únicos por organización. La función es pura y ya tiene pruebas; la pantalla de tareas llega en un sprint posterior.

## Roadmap

- **S0 — Cimientos.** Aplicación, modelo, migración, semilla, inicio de sesión, tablero vacío, pruebas y CI. Este sprint.
- **S1 — Organización.** Proyectos, miembros y roles con permisos (`DIRECCION`, `PM`, `DESARROLLADOR`, `CLIENTE`, `AGENTE`).
- **S2 — Tareas.** Alta de tareas y subtareas, identificador `ATIE-123`, vista kanban y lista con filtros.
- **S3 — Stage-gate.** Flujo por etapas con checklists y aprobaciones de puerta.
- **Después.** Páginas anidadas al estilo Notion, integración con GitHub, notificaciones y auditoría, y operación: CI ya cubierto en parte, más respaldos y despliegue.

`TimeEntry` está en el esquema y reservado. No hay pantalla ni escritura de tiempo en este sprint.

## Decisiones pendientes

- **Hosting.** Vercel + Neon, o Railway, o un VPS. No se despliega nada hasta elegir.
- **Nombre definitivo.** El nombre de trabajo es `atie-flow`.
- **Acceso de clientes.** El MVP asume solo equipo interno. El rol `CLIENTE` existe en el modelo, sin invitación ni permisos todavía.
- **Inicio de sesión corporativo.** Google y Microsoft están preparados en la configuración y apagados. Falta decidir el proveedor y registrar la aplicación.
- **Presupuesto.** Sin cuentas ni servicios de pago creados desde este repositorio.
- **Protección de la rama `main`.** Debe exigir pull request y el CI en verde antes de integrar. En este sprint no se pudo configurar: el token del agente no tiene permiso de administración y la API de protección de ramas responde 403. Queda como tarea de un administrador de `Atie-pro/atie-flow`.
