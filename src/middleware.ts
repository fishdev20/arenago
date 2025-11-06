import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: Request) {
  return updateSession(request as any)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Apply globally except assets
}
