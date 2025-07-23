// middleware.ts (di root folder project, sejajar dengan app/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ambil token dari cookie atau localStorage (via header)
  // Karena middleware berjalan di server, kita perlu menggunakan cookie
  const accessToken =
    request.cookies.get("auth-token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  // Cek apakah user sudah login (ada token)
  const isAuthenticated = !!accessToken;

  // Halaman yang tidak boleh diakses jika sudah login (public routes)
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  // Halaman yang hanya bisa diakses jika sudah login (protected routes)
  const protectedRoutes = ["/home", "/dashboard", "/profile", "/settings"];

  // Jika user sudah login dan mengakses public routes
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    // Redirect ke /home
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Jika user belum login dan mengakses protected routes
  if (
    !isAuthenticated &&
    (protectedRoutes.some((route) => pathname.startsWith(route)) ||
      pathname.startsWith("/home"))
  ) {
    // Redirect ke halaman login
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Lanjutkan request jika tidak ada redirect
  return NextResponse.next();
}

// Konfigurasi matcher - tentukan route mana yang akan diproses middleware
export const config = {
  matcher: [
    /*
     * Match semua request paths kecuali:
     * 1. /api routes (API routes)
     * 2. /_next/static (static files)
     * 3. /_next/image (image optimization files)
     * 4. /favicon.ico (favicon file)
     * 5. File dengan extension (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
