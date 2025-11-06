'use client'

import { User } from '@/types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  sbUser: User | null
  idToken: string | null
  refreshToken: string | null
  loading: boolean
  hasPasswordProvider: boolean
  setsbUser: (user: User | null) => void
  setTokens: (idToken: string | null, refreshToken: string | null) => void
  setLoading: (val: boolean) => void
  setHasPasswordProvider: (val: boolean) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      sbUser: null,
      idToken: null,
      refreshToken: null,
      loading: true,
      // error: null,
      hasPasswordProvider: false,

      setFbUser: (fbUser: User | null) => set({ fbUser }),
      setTokens: (idToken, refreshToken) => set({ idToken, refreshToken }),
      setLoading: (val: boolean) => set({ loading: val }),
      setHasPasswordProvider: (val: boolean) => set({ hasPasswordProvider: val }),
      reset: () =>
        set({
          fbUser: null,
          idToken: null,
          refreshToken: null,
          hasPasswordProvider: false,
          loading: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        fbUser: state.fbUser,
        idToken: state.idToken,
        refreshToken: state.refreshToken,
        hasPasswordProvider: state.hasPasswordProvider,
      }),
    }
  )
)
