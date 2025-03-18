import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Create a new response headers object
  const responseHeaders = new Headers()

  // Set cache control headers to prevent caching for all requests
  responseHeaders.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  responseHeaders.set('Pragma', 'no-cache')
  responseHeaders.set('Expires', '0')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
    headers: responseHeaders,
  })
}

// Configure the middleware to run on specific paths
export const config = {
  // Apply to all routes except static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
