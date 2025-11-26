'use client'

import { supabase } from '@/lib/supabase/client'
import { toUser } from '@/lib/utils'
import { signIn, signOut, signUp } from '@/services/auth/client'
import { getProfile, upsertProfile } from '@/services/user.services'
import { useUserStore } from '@/store/user-store'
import { SignupRequest } from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

/* ---------------------------
 * ⚙️ Hook: Initialize Session and Realtime Auth
 * -------------------------- */
export function useInitAuth() {
  const { setUser, resetUser, setLoading } = useUserStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const init = async () => {
      setLoading(true)
      try {
        // ✅ 1️⃣ Get current session
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        const session = data.session

        if (session?.user) {
          const sbUser = session.user
          const user = toUser(sbUser)
          let profile = await getProfile(user.uid)

          // ✅ Create profile if not exists
          if (!profile) {
            profile = await upsertProfile(user.uid, {
              email: user.email,
              displayName: user.displayName,
              photoUrl: user.photoUrl,
            })
            console.log('profile', profile)
          }

          setUser(profile)
          queryClient.setQueryData(['profile', user.uid], profile)
        } else {
          resetUser()
        }
      } catch (err) {
        console.error('❌ useInitAuth failed:', err)
        resetUser()
      } finally {
        setLoading(false)
      }

      // ✅ 2️⃣ Listen for future auth changes
      const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('[Auth Event]', event)
        if (!session) {
          resetUser()
          return
        }

        const sbUser = session.user
        console.log(session)
        const user = toUser(sbUser)
        const profile = await getProfile(user.uid)

        if (profile) {
          setUser(profile)
          queryClient.setQueryData(['profile', user.uid], profile)
        }
      })

      unsubscribe = () => listener.subscription.unsubscribe()
    }

    init()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [queryClient, resetUser, setUser, setLoading])
}

/* ---------------------------
 * 🧠 Hook: Authentication Actions (Sign in/out/up/reset/etc.)
 * -------------------------- */
export function useAuth() {
  const { setUser, resetUser } = useUserStore()
  const queryClient = useQueryClient()
  const router = useRouter()

  /* 🔹 SIGN UP */
  const signUpMutation = useMutation({
    mutationFn: (data: SignupRequest) => signUp(data),
    onSuccess: (profile) => {
      setUser(profile)
      queryClient.setQueryData(['profile', profile.id], profile)
      toast.success('Account created successfully!')
      router.push('/settings')
    },
    onError: (error: any) => {
      console.error('Sign up error:', error)
    },
  })

  /* 🔹 SIGN IN */
  const signInMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: () => {
      toast.success('Signed in successfully')
      router.push('/settings')
    },
    onError: (error: any) => {
      console.error('Sign in failed:', error)
      toast.error('Failed to login', { description: error.message })
    },
  })

  /* 🔹 SIGN OUT */
  const signOutMutation = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      resetUser()
      queryClient.clear()
      toast.success('Signed out')
      router.push('/signin')
    },
    onError: (error: any) => {
      console.error('Sign out failed:', error)
      toast.error('Error signing out', { description: error.message })
    },
  })

  /* 🔹 RESET PASSWORD */
  const sendResetEmail = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
      })
      if (error) throw error
      return true
    },
    onSuccess: () => toast.success('Reset email sent! Check your inbox.'),
    onError: (error: any) =>
      toast.error('Error sending reset email', { description: error.message }),
  })

  /* 🔹 CHANGE PASSWORD */
  const updatePassword = useMutation({
    mutationFn: async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      return true
    },
    onSuccess: () => toast.success('Password updated successfully!'),
    onError: (error: any) =>
      toast.error('Failed to update password', { description: error.message }),
  })

  return {
    signUp: signUpMutation,
    signIn: signInMutation,
    signOut: signOutMutation,
    sendResetEmail,
    updatePassword,
  }
}
