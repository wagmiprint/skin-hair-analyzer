import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const accessCookie = request.cookies.get("eradna_access")?.value
  const expectedToken = process.env.SITE_ACCESS_TOKEN

  // Allow the request when the access cookie matches the expected token.
  if (expectedToken && accessCookie === expectedToken) {
    return NextResponse.next()
  }

  // Otherwise send the visitor to the gate, preserving where they came from.
  const gateUrl = new URL("/gate", request.url)
  gateUrl.searchParams.set("from", pathname + request.nextUrl.search)
  return NextResponse.redirect(gateUrl)
}

export const config = {
  // Run on all routes except Next internals, the favicon, the gate page,
  // the gate API endpoint, and static assets (any path with a file extension,
  // e.g. /images/*.png) so the gate screen can load its own assets.
  matcher: ["/((?!_next/|favicon.ico|gate|api/gate|.*\\..*).*)"],
}
