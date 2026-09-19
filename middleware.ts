import { NextRequest, NextResponse } from "next/server";
//middleware para verificar se o usuario esta logado
export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("sessionToken")?.value;
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/perfil/:path*", "/newProperty/:path*"],
};
