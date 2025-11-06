'use server'
import { supabase } from '@/lib/supabase/client'
import { createClientServer } from '@/lib/supabase/server'
import { toCamel, toSnake } from '@/lib/utils'
import { User } from '@supabase/supabase-js'
import { UserProfile } from 'firebase/auth'
import { redirect } from 'next/navigation'

function toUser(sbUser: User) {
  return {
    uid: sbUser.id,
    email: sbUser.email,
    displayName: sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0],
    photoUrl: sbUser.user_metadata?.avatar_url || null,
  }
}

// export async function signUp({ email, password, displayName, info }: SignupRequest) {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: { display_name: displayName, ...toSnake(info) },
//       emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
//     },
//   })

//   if (error) throw error
//   const sbUser = data.user
//   if (!sbUser) throw new Error('User is null')
//   const user = toUser(sbUser)
//   const profile = await upsertProfile(user.uid, { ...info, displayName, email })

//   return profile
// }

export async function signUp(prevState: any, formData: FormData) {
  const supabase = await createClientServer()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw new Error(error.message)
  // if (!data.user) throw new Error('User is null')
  redirect('/settings')
}

export async function upsertProfileServer(
  uid: string,
  profileData: Partial<UserProfile>
): Promise<UserProfile> {
  const supabase = await createClientServer()

  const payload = {
    id: uid,
    ...toSnake(profileData),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .maybeSingle()

  if (error) {
    console.error('❌ upsertProfileServer failed:', error)
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('Profile not created or found.')
  }

  return toCamel(data)
}

type SignInState = { error?: string; success?: string }

export async function signIn(prevState: SignInState, formData: FormData): Promise<SignInState> {
  const supabaseServer = await createClientServer()
  const { data, error } = await supabaseServer.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) {
    return { error: error.message }
  }
  // const sbUser = data.user
  // const user = toUser(sbUser)
  // if (!sbUser) return { error: 'User not found' }
  // const profile = await getProfile(user.uid)
  redirect('/')
  // return profile
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}
