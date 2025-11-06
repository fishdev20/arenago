'use client'

import { supabase } from '@/lib/supabase/client'
import { toCamel, toSnake } from '@/lib/utils'
import { UserProfile } from '@/types/user'

export async function upsertProfile(
  uid: string,
  profileData: Partial<UserProfile>
): Promise<UserProfile> {
  console.log('profileData', profileData)
  const payload = {
    id: uid,
    ...toSnake(profileData),
    updated_at: new Date().toISOString(),
  }
  // 🧩 Perform UPSERT with conflict handling
  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .maybeSingle()

  if (error) {
    console.error('❌ upsertProfile failed:', error)
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('Profile not found or not created.')
  }

  return data as UserProfile
}

export async function getProfile(uid: string): Promise<UserProfile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', uid).maybeSingle()

  if (error) {
    console.error('Error fetching profile:', error.message)
    return null
  }
  if (!data) {
    return null
  }
  return toCamel(data)
}
