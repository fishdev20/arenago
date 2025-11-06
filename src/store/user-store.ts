'use client'

import { UserProfile } from '@/types/user'
import { create } from 'zustand'

type UserStore = {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  updateUser: (patch: Partial<UserProfile>) => void
  resetUser: () => void
  setLoading: (loading: boolean) => void
  loading: boolean
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  updateUser: (patch) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...patch } : null,
    })),
  setLoading: (loading) => set({ loading }),
  resetUser: () => set({ user: null }),
}))
