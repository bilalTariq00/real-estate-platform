import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If user is logged in and visits "/", redirect to "/map"
  if (req.nextUrl.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/map", req.url));
  }

  // If user is NOT logged in and tries to access "/map", redirect to "/"
  if (req.nextUrl.pathname.startsWith("/map") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/", "/map"],
};
