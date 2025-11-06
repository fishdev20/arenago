'use client'

import { useUserStore } from '@/store/user-store'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

export default function GuestGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.replace('/settings')
    }
  }, [user, loading, router])

  if (loading || user) return null

  return <>{children}</>
}
