import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

const REGION_MAP: Record<string, string> = {
  cz: "cz",
  sk: "sk",
  de: "de",
  at: "at",
  gb: "gb",
  us: "us",
}

function getCountryCode(request: NextRequest): string {
  // 1. From URL path param
  const pathname = request.nextUrl.pathname
  const pathParts = pathname.split("/")
  const pathCountry = pathParts[1]?.toLowerCase()
  if (pathCountry && REGION_MAP[pathCountry]) return pathCountry

  // 2. From cookie
  const cookieCountry = request.cookies.get("_medusa_region")?.value
  if (cookieCountry && REGION_MAP[cookieCountry]) return cookieCountry

  // 3. From Vercel geo header
  const geoCountry = request.headers.get("x-vercel-ip-country")?.toLowerCase()
  if (geoCountry && REGION_MAP[geoCountry]) return geoCountry

  return DEFAULT_REGION
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip static files and Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    /\.\w+$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  const countryCode = getCountryCode(request)

  // If already has a valid countryCode prefix, proceed
  const pathParts = pathname.split("/")
  if (pathParts[1] && REGION_MAP[pathParts[1].toLowerCase()]) {
    const response = NextResponse.next()
    response.cookies.set("_medusa_region", pathParts[1].toLowerCase(), {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
    })
    return response
  }

  // Redirect to countryCode-prefixed URL
  const url = request.nextUrl.clone()
  url.pathname = `/${countryCode}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next|api|favicon|.*\\..*).*)"],
}
