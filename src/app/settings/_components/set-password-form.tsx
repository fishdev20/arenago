'use client'
import AlertMessage from '@/components/app/alert/alert-message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function SetPasswordForm() {
  // const { linkPassword, loading, error } = useAuthStore()
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const handleSetPassword = async () => {
    if (password.length < 6) return setMessage('Password must be at least 6 characters.')
    // const res = await linkPassword(password)
    if (res.success) setMessage('Password successfully set! You can now log in using email.')
    else setMessage(res.error || 'Failed to set password.')
  }

  return (
    <div className="flex flex-col gap-3 p-6 border rounded-lg shadow-md max-w-md w-full">
      <h3 className="text-lg font-semibold">Set a Password</h3>
      <p className="text-sm text-muted-foreground">
        You signed in with Google. You can set a password to also log in with email.
      </p>

      <Input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleSetPassword} disabled={loading} className="mt-3 self-end">
        {loading ? 'Saving...' : 'Save Password'}
      </Button>

      {message && (
        <AlertMessage
          title={res?.success ? 'Success' : 'Error'}
          message={message}
          type={res?.success ? 'success' : 'error'}
        />
      )}
    </div>
  )
}
