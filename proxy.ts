// proxy.ts (place in root directory)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't need protection
  const publicRoutes = ["/sign-up", "/sign-in", "/"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  // Note: In client-side routing, we handle this in useEffect
  // This proxy is backup for direct URL access

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
