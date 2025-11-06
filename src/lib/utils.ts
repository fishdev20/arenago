import { User } from '@supabase/supabase-js'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toCamel<T extends Record<string, any>>(obj: T): any {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
      value,
    ])
  )
}

export function toSnake<T extends Record<string, any>>(obj: T): any {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
      value,
    ])
  )
}

export function toUser(sbUser: User) {
  return {
    uid: sbUser.id,
    email: sbUser.email,
    displayName: sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0],
    photoUrl: sbUser.user_metadata?.avatar_url || null,
  }
}
