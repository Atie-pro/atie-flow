import { NextResponse, type NextRequest } from "next/server";
import { leerTokenSesion } from "@/lib/sesion-cookie";

const RUTAS_PUBLICAS = [/^\/iniciar-sesion$/, /^\/api\/auth(\/|$)/];

export function middleware(solicitud: NextRequest) {
  const { pathname } = solicitud.nextUrl;
  if (RUTAS_PUBLICAS.some((ruta) => ruta.test(pathname))) {
    return NextResponse.next();
  }

  const token = leerTokenSesion(solicitud.headers.get("cookie"));
  if (!token) {
    const destino = new URL("/iniciar-sesion", solicitud.url);
    if (pathname !== "/") {
      destino.searchParams.set("desde", pathname);
    }
    return NextResponse.redirect(destino);
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/tablero", solicitud.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
