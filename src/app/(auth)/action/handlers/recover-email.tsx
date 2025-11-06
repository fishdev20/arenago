'use client'

import { auth } from '@/lib/firebase'
import { applyActionCode, checkActionCode } from 'firebase/auth'
import { useEffect, useState } from 'react'

export default function RecoverEmailHandler({ oobCode }: { oobCode: string }) {
  const [status, setStatus] = useState('Restoring your email...')

  useEffect(() => {
    async function recover() {
      try {
        const info = await checkActionCode(auth, oobCode)
        await applyActionCode(auth, oobCode)
        setStatus(`✅ Email restored to ${info.data.email}`)
      } catch {
        setStatus('❌ Failed to restore email.')
      }
    }
    recover()
  }, [oobCode])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p>{status}</p>
    </div>
  )
}
