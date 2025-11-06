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
import {
  CountrySelect,
  getCountryCodeFromName,
  getCountryName,
} from '@/components/ui/country-selector'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { PhoneInput } from '@/components/ui/phone-input'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { CountryCode } from 'libphonenumber-js/core'
import { Box, Building, MapPinHouse } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import EmailInput from '../_components/email-input'
import GoogleButton from '../_components/google-button'
import PasswordInput from '../_components/password-input'

export default function SignUpPage() {
  const { signUp } = useAuth()
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
    country: '',
    phone: '',
    address: '',
    state: '',
    postalCode: '',
    city: '',
    bio: '',
  })
  const [country, setCountry] = useState<CountryCode | null>(
    getCountryCodeFromName(form.country) || null
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    signUp.mutate({
      email: form.email,
      password: form.password,
      displayName: form.displayName,
      info: {
        ...form,
      },
    })
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-xl">Join the Arena</CardTitle>
        <CardDescription>Create your account to book your next game</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <EmailInput name="email" value={form.email} onChange={handleChange} />
          <PasswordInput name="password" value={form.password} onChange={handleChange} />
          <PasswordInput
            name="password"
            value={form.password}
            onChange={handleChange}
            title="Confirm password"
          />
          <div className="space-y-1">
            <Label htmlFor="address">Street Address</Label>
            <InputGroup>
              <InputGroupInput
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your street address"
              />
              <InputGroupAddon>
                <Building />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="space-y-1 w-full md:w-[50%]">
              <Label htmlFor="postalCode">Postal Code</Label>
              <InputGroup>
                <InputGroupInput
                  id="postalCode"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="Enter postal code"
                />
                <InputGroupAddon>
                  <Box />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="space-y-1 w-full md:w-[50%]">
              <Label htmlFor="city">City</Label>
              <InputGroup>
                <InputGroupInput
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
                <InputGroupAddon>
                  <MapPinHouse />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="space-y-1 w-full md:w-[50%]">
              <Label htmlFor="postalCode">State</Label>
              <Input
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Enter postal code"
              />
            </div>
            <div className="space-y-1 w-full md:w-[50%]">
              <Label htmlFor="country">Country</Label>
              <CountrySelect
                value={country as CountryCode}
                onChange={(v) => {
                  setCountry(v)
                  setForm((prev) => ({ ...prev, country: getCountryName(v) }))
                }}
                triggerClassName={cn('w-full')}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone Number</Label>
            <PhoneInput
              id="phone"
              name="phone"
              value={form.phone}
              onChange={(val) => setForm((prev) => ({ ...prev, phone: val || '' }))}
              placeholder="Enter your phone number"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full mt-4" size={'lg'} onClick={() => handleSubmit()}>
          Sign Up
        </Button>
        <GoogleButton />
        <p className="mt-1 text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href={'/signin'} className="text-primary hover:underline">
            Sign in
          </Link>
        </p>

        {signUp.isError && (
          <AlertMessage type="error" title="Sign In Failed" message={signUp.error.message} />
        )}
      </CardFooter>
    </Card>
  )
}
