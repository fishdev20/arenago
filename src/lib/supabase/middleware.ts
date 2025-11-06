import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // ✅ Always create a mutable NextResponse (important for cookie refresh)
  const response = NextResponse.next()

  // ✅ Create Supabase client that can both read & write cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            response.cookies.set({ name, value, ...options })
          } catch (err) {
            console.error('[Supabase cookie set failed]', err)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            response.cookies.set({ name, value: '', ...options })
          } catch (err) {
            console.error('[Supabase cookie remove failed]', err)
          }
        },
      },
    }
  )

  // ✅ This automatically refreshes the session if expired
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.warn('[Supabase Auth Error]', error.message)
  }

  const path = request.nextUrl.pathname

  // 🟢 Public routes (accessible without authentication)
  const publicPaths = [
    '/',
    '/explore',
    '/groups',
    '/events',
    '/signin',
    '/signup',
    '/auth',
    '/error',
  ]

  const isPublic = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(publicPath)
  )

  // 🔒 Redirect unauthenticated users away from private routes
  if (!user && !isPublic) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/signin'
    redirectUrl.searchParams.set('redirectedFrom', path)
    console.log('[Middleware] No user found, redirecting to /signin')
    return NextResponse.redirect(redirectUrl)
  }

  // 🚪 Prevent authenticated users from visiting signin/signup again
  if (user && (path.startsWith('/signin') || path.startsWith('/signup'))) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/settings'
    console.log('[Middleware] User logged in, redirecting to /settings')
    return NextResponse.redirect(redirectUrl)
  }

  // ✅ Return response so cookies are updated (critical!)
  return response
}
