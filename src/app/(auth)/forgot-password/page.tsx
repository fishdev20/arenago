'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { useState } from 'react'
import EmailInput from '../_components/email-input'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return <p>✅ Password reset link sent to your email!</p>
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter the email address you used to register with</CardDescription>
      </CardHeader>
      <CardContent>
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="flex gap-2 justify-between w-full">
          <Button variant="outline">
            <Link href="/signin">Back to sign in</Link>
          </Button>
          <Button
            variant={'default'}
            onClick={() => handleSubmit()}
            // disabled={sendPasswordReset.isPending}
          >
            {/* {sendPasswordReset.isPending && <Spinner />} */}
            Send email
          </Button>
        </div>

        {/* {sendPasswordReset.isError && (
          <AlertMessage
            title={'Error'}
            message={sendPasswordReset.error?.message || 'Failed to send password reset email.'}
            type={'error'}
          />
        )}
        {sendPasswordReset.isSuccess && (
          <AlertMessage
            title={'Success'}
            message={'Email sent! Please check your inbox.'}
            type={'success'}
          />
        )} */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardFooter>
    </Card>
  )
}
