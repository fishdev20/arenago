'use client'

import { useUserStore } from '@/store/user-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner } from '../ui/spinner'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/signin')
    }
  }, [user, router])

  if (loading && !user) {
    return (
      <div className="flex gap-2 items-center justify-center min-h-screen">
        <Spinner /> Loading...
      </div>
    )
  }

  if (user) return <>{children}</>

  return null
}
