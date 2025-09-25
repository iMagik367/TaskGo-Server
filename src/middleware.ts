
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // Rotas que não precisam de autenticação
  if (request.nextUrl.pathname === "/login") {
    const token = request.cookies.get("auth_token");
    
    // Se já estiver autenticado, redireciona para o dashboard
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token.value, secret);
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch {
        // Se o token for inválido, deixa acessar a página de login
      }
    }
    return NextResponse.next();
  }

  // Verifica autenticação para rotas admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth_token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token.value, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};