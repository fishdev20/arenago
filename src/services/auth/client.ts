import { supabase } from '@/lib/supabase/client'
import { toSnake, toUser } from '@/lib/utils'
import { SignupRequest } from '@/types/auth'
import { upsertProfile } from '../user.services'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error

  // const sbUser = data.user
  // const user = toUser(sbUser)
  // const profile = await getProfile(user.uid)
  // queryClient.setQueryData(['profile', user.uid], profile)

  // return profile
}

export async function signUp(request: SignupRequest) {
  const { email, password, displayName, info } = request
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName, ...toSnake(info) },
    },
  })
  if (error) throw error

  const sbUser = data.user
  if (!sbUser) throw new Error('User is null')
  const user = toUser(sbUser)
  const profile = await upsertProfile(user.uid, { ...info, displayName, email })
  return profile
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function changeEmail(newEmail: string) {
  const { error } = await supabase.auth.updateUser({
    email: newEmail,
  })
  if (error) throw error
}
