'use client'

import { Spinner } from '@/components/ui/spinner'
import { auth } from '@/lib/firebase'
import { applyActionCode } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VerifyEmailHandler({ oobCode }: { oobCode: string }) {
  const [status, setStatus] = useState('Verifying your email...')
  const router = useRouter()

  useEffect(() => {
    async function verify() {
      try {
        await applyActionCode(auth, oobCode)
        setStatus('✅ Email verified successfully!')
        setTimeout(() => router.replace('/signin'), 2000)
      } catch (err) {
        console.error(err)
        setStatus('❌ Verification failed. This link may be expired or invalid.')
      }
    }
    verify()
  }, [oobCode, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Spinner />
      <p className="mt-4">{status}</p>
    </div>
  )
}
