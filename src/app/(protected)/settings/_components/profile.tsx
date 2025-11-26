'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  CountrySelect,
  getCountryCodeFromName,
  getCountryName,
} from '@/components/ui/country-selector'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { PhoneInput } from '@/components/ui/phone-input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user-store'
import { CountryCode } from 'libphonenumber-js/core'
import { Box, Building, CircleUserRound, MailIcon, MapPinHouse } from 'lucide-react'
import { useEffect, useState } from 'react'

type RecommendedFields = {
  address?: boolean
  phone?: boolean
  country?: boolean
  postalCode?: boolean
  city?: boolean
}

export default function Profile() {
  const { user } = useUserStore()
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    country: user?.country || '',
    postalCode: user?.country || '',
    state: user?.state || '',
    bio: user?.bio || '',
    city: user?.city || '',
  })
  const [country, setCountry] = useState<CountryCode | null>(
    getCountryCodeFromName(form.country) || null
  )
  const [warnings, setWarnings] = useState<RecommendedFields>({})
  console.log('profile', user)
  useEffect(() => {
    setWarnings({
      address: !form.address,
      phone: !form.phone,
      country: !country,
      postalCode: !form.postalCode,
      city: !form.city,
    })
  }, [form.address, form.phone, country, form.postalCode, form.city])

  useEffect(() => {
    if (form.country) {
      setCountry(getCountryCodeFromName(form.country) || null)
    }
  }, [form.country])

  // const updateUser = useUpdateUser()

  useEffect(() => {
    if (user) {
      setForm({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user?.address || '',
        postalCode: user?.postalCode || '',
        state: user?.postalCode || '',
        city: user?.city || '',
        country: user.country || '',
        bio: user.bio || '',
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (!user) return
    console.log('Saving...', form)
    // updateUser.mutate({
    //   uid: profile.uid,
    //   data: {
    //     ...form,
    //   },
    // })
  }
  console.log(country)
  return (
    <div className="w-full space-y-10">
      <section className="flex flex-col md:flex-row space-y-6">
        <div className="w-full md:w-[40%]">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.photoUrl ?? ''} alt="Avatar" />
              <AvatarFallback>{user?.displayName || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-md md:text-lg font-semibold">Personal Information</h2>
              <p className="text-xs md:text-md text-muted-foreground">
                Update your personal details here.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-[60%]">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <InputGroup>
              <InputGroupInput
                id="fullName"
                name="fullName"
                value={form.displayName}
                onChange={handleChange}
                placeholder="Your name"
                disabled
                readOnly
              />
              <InputGroupAddon>
                <CircleUserRound />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email:</Label>
            <InputGroup>
              <InputGroupInput
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                disabled
                readOnly
              />
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="address"
              className={cn('flex items-center gap-2', warnings.address && 'text-yellow-600')}
            >
              Street Address
              {warnings.address && (
                <span className="text-xs font-normal text-yellow-600">(Recommended)</span>
              )}
            </Label>
            <InputGroup
              className={cn(warnings.address && 'border-yellow-500 focus:border-yellow-500')}
            >
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
            <div className="space-y-2 w-full md:w-[50%]">
              <Label
                htmlFor="postalCode"
                className={cn('flex items-center gap-2', warnings.postalCode && 'text-yellow-600')}
              >
                Postal Code
                {warnings.postalCode && (
                  <span className="text-xs font-normal text-yellow-600">(Recommended)</span>
                )}
              </Label>
              <InputGroup
                className={cn(warnings.address && 'border-yellow-500 focus:border-yellow-500')}
              >
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

            <div className="space-y-2 w-full md:w-[50%]">
              <Label
                htmlFor="city"
                className={cn('flex items-center gap-2', warnings.city && 'text-yellow-600')}
              >
                City
                {warnings.city && (
                  <span className="text-xs font-normal text-yellow-600">(Recommended)</span>
                )}
              </Label>
              <InputGroup
                className={cn(warnings.address && 'border-yellow-500 focus:border-yellow-500')}
              >
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
            <div className="space-y-2 w-full md:w-[50%]">
              <Label htmlFor="postalCode">State</Label>
              <Input
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Enter postal code"
              />
            </div>

            <div className="space-y-2 w-full md:w-[50%]">
              <Label
                htmlFor="country"
                className={cn('flex items-center gap-2', warnings.country && 'text-yellow-600')}
              >
                Country
                {warnings.country && (
                  <span className="text-xs font-normal text-yellow-600">(Recommended)</span>
                )}
              </Label>
              <CountrySelect
                value={country as CountryCode}
                onChange={(v) => {
                  setCountry(v)
                  setForm((prev) => ({ ...prev, country: getCountryName(v) }))
                }}
                triggerClassName={cn(
                  'w-full',
                  warnings.country && 'border-yellow-500 focus:border-yellow-500'
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className={cn('flex items-center gap-2', warnings.phone && 'text-yellow-600')}
            >
              Phone Number
              {warnings.phone && (
                <span className="text-xs font-normal text-yellow-600">(Recommended)</span>
              )}
            </Label>
            <PhoneInput
              id="phone"
              value={form.phone}
              onChange={(value) => setForm((prev) => ({ ...prev, phone: value || '' }))}
              placeholder="Enter a phone number"
              className={cn(warnings.phone && 'border-yellow-500 focus:border-yellow-500')}
            />
          </div>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col md:flex-row space-y-6">
        <div className="w-full md:w-[40%]">
          <h2 className="text-lg font-semibold">Bio</h2>
          <p className="text-sm text-muted-foreground">
            Write a short introduction about yourself.
          </p>
        </div>

        <Textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Tell us a little about yourself..."
          className="min-h-[120px] w-full md:w-[60%]"
        />
      </section>

      <Separator />

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}
