import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Security: Block open redirect, protocol-relative attacks (e.g. //evil.com or /\evil.com) and null bytes
  if (
    pathname.startsWith("//") ||
    pathname.startsWith("/\\") ||
    pathname.includes("\\") ||
    pathname.includes("\0")
  ) {
    return new NextResponse("Bad Request: Invalid Request Path", { status: 400 });
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(te|en)/:path*",
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|api|content|favicon.ico|.*\\..*).*)",
  ],
};
