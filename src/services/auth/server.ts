'use server'
import { createClientServer } from '@/lib/supabase/server'
import { Provider } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClientServer()
  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  })

  if (error) {
    console.log(error)
  }

  redirect(data.url || '/')
}

export const continueWithGoogle = signInWith('google')
