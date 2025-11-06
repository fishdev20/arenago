'use client'

import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export type CountryEntry = {
  label: string
  value: RPNInput.Country | undefined
}

export type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (country: RPNInput.Country) => void
  triggerClassName?: string
}

export interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country
  onChange: (country: RPNInput.Country) => void
  onSelectComplete: () => void
}

export function getCountryList() {
  const countries = RPNInput.getCountries()
  return countries.map((country) => ({
    value: country,
    label: getCountryName(country),
    dialCode: RPNInput.getCountryCallingCode(country),
  }))
}

// Get full country name using Intl API
export function getCountryName(countryCode: string) {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) || countryCode
  } catch (error) {
    return countryCode
  }
}

export function getCountryCodeFromName(countryName: string): RPNInput.Country | undefined {
  const countries = RPNInput.getCountries()
  return countries.find((code) => {
    const name = getCountryName(code)
    return name.toLowerCase() === countryName.toLowerCase()
  })
}

export const CountrySelect = ({
  disabled,
  value: selectedCountry,
  onChange,
  triggerClassName,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)

  const countryList = React.useMemo(() => getCountryList(), [])
  const filteredCountries = React.useMemo(() => {
    if (!searchValue) return countryList
    const search = searchValue.toLowerCase()
    return countryList.filter(
      (country) => country.label.toLowerCase().includes(search) || country.dialCode.includes(search)
    )
  }, [countryList, searchValue])
  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open)
        open && setSearchValue('')
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn('flex gap-3', triggerClassName)}
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={getCountryName(selectedCountry)} />
          <span className="flex-1 text-left">
            {getCountryName(selectedCountry) || 'Select country'}
          </span>
          <ChevronsUpDown
            className={cn('-mr-2 size-4 opacity-50', disabled ? 'hidden' : 'opacity-100')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            name="country"
            value={searchValue}
            onValueChange={setSearchValue}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {filteredCountries.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country)
    onSelectComplete()
  }

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <CheckIcon
        className={cn('ml-auto size-4', country === selectedCountry ? 'opacity-100' : 'opacity-0')}
      />
    </CommandItem>
  )
}

export const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}
