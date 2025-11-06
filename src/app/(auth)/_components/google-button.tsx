'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { continueWithGoogle } from '@/services/auth/server'

import Image from 'next/image'
import { useTransition } from 'react'

export default function GoogleButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={() => {
        startTransition(async () => {
          await continueWithGoogle() // calls the server action
        })
      }}
      className="w-full"
    >
      <Button type="submit" variant="outline" className="flex-1 w-full mt-2" disabled={isPending}>
        {isPending ? (
          <Spinner />
        ) : (
          <Image
            className="w-5 h-5 mr-2"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
            width={24}
            height={24}
          />
        )}
        Continue with Google
      </Button>
    </form>
  )
}
