// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production" ? true : false,
  });
  const pathname = req.nextUrl.pathname;

  console.log("TOKEN", token);
  console.log(process.env.NEXT_AUTH_SECRET);

  if (
    pathname.startsWith("/api/auth") ||
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/blog"
  ) {
    return NextResponse.next();
  }
  //  Redirect to /login if no token
  if (!token) {
    const loginUrl = new URL("/api/auth/signin/", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

// Protect specific routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/write/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
};
