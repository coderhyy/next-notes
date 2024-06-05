import { defaultLocale, localePrefix, locales } from "@/config";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Exclude specific paths from further processing
  if (
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/api") &&
    !request.nextUrl.pathname.startsWith("/_next") &&
    !request.nextUrl.pathname.includes(".")
  ) {
    return intlMiddleware(request);
  }
  // Return the response object directly
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(zh|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
