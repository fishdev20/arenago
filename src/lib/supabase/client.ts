import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createBrowserClient(supabaseUrl!, supabaseKey!, {
  auth: {
    persistSession: true, // ✅ stores session in localStorage
    autoRefreshToken: true, // ✅ refreshes token automatically
    detectSessionInUrl: true, // ✅ reads OAuth redirect from URL hash
  },
})
