import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  console.log(code)
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    console.error('[Auth Callback] Missing code')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  // ✅ Create a redirect response (so cookies are attached to it)
  const response = NextResponse.redirect(`${origin}${next}`)

  // ✅ Create Supabase client with read/write cookie support
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // ✅ Exchange OAuth code for session (writes cookies via the response)
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('[Supabase Auth Error]', error.message)
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  console.log('✅ Session created for user:', data.session?.user?.email)

  return response
}
