'use client'
import AlertMessage from '@/components/app/alert/alert-message'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { CheckboxIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import EmailInput from '../_components/email-input'
import GoogleButton from '../_components/google-button'
import PasswordInput from '../_components/password-input'

export default function SignInPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Enter your email and password to book your next game</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <CheckboxIcon id="remember" />
              <label htmlFor="remember" className="text-muted-foreground">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          className="w-full mt-4"
          size={'lg'}
          disabled={signIn.isPending}
          onClick={() => signIn.mutate({ email, password })}
        >
          {signIn.isPending && <Spinner />}Sign In
        </Button>
        <GoogleButton />
        <p className="mt-1 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href={'/signup'} className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
        {signIn.isError && (
          <AlertMessage
            type="error"
            title="Sign In Failed"
            message={signIn.error}
            actionLabel="Try again"
            onAction={() => signIn.mutate({ email, password })}
          />
        )}
      </CardFooter>
    </Card>
  )
}
