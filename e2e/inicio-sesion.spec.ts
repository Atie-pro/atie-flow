import { expect, test } from "@playwright/test";

const correo = process.env.SEED_ADMIN_EMAIL;
const contrasena = process.env.SEED_ADMIN_PASSWORD;

test("un usuario interno entra y ve el tablero vacío de ATIE", async ({
  page,
}) => {
  expect(correo, "Falta SEED_ADMIN_EMAIL").toBeTruthy();
  expect(contrasena, "Falta SEED_ADMIN_PASSWORD").toBeTruthy();

  await page.goto("/tablero");
  await expect(page).toHaveURL(/iniciar-sesion/);
  await expect(
    page.getByRole("heading", { name: "Conectamos el futuro" }),
  ).toBeVisible();

  await page.getByLabel("Correo").fill("no-existe@atie.com.ec");
  await page.getByLabel("Contraseña").fill("contrasena-incorrecta");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByText("Correo o contraseña incorrectos.")).toBeVisible();

  await page.getByLabel("Correo").fill(correo ?? "");
  await page.getByLabel("Contraseña").fill(contrasena ?? "");
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page).toHaveURL(/\/tablero$/);
  await expect(page.getByRole("heading", { name: "Tablero" })).toBeVisible();
  await expect(page.getByText("ATIE", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("No hay proyectos todavía.")).toBeVisible();
  await expect(page.getByText("Conectamos el futuro")).toBeVisible();
});
