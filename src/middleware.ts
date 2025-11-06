import { updateSession } from '@/lib/edge/update-session'
import { NextRequest } from 'next/server'

export const runtime = 'experimental-edge'

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Apply globally except assets
}
