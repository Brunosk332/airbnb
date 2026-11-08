import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "./lib/auth";
//middleware para verificar se o usuario esta logado na pagina de perfil
export function proxy(request: NextRequest) {
  const res = getSessionUser()
if (!res) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/profile/:path*", "/newProperty/:path*", "/property/:id/payment:path*"],
};
