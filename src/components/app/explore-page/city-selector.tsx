'use client'

import { MultiSelect } from '@/components/ui/multi-select'
import { useSearchStore } from '@/store/search-store'
import { useEffect, useState } from 'react'

type City = {
  code: string
  name: string
}

export default function CitySelector() {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([])
  const { selectedCities, setSelectedCities } = useSearchStore()
  useEffect(() => {
    fetch('/data/cities.json')
      .then((res) => res.json())
      .then((data: City[]) => {
        setOptions(
          data.map((city) => ({
            value: city.code,
            label: city.name,
          }))
        )
      })
      .catch((err) => console.error('❌ Failed to load cities.json', err))
  }, [])

  return (
    <MultiSelect
      options={options}
      onValueChange={setSelectedCities}
      defaultValue={selectedCities}
      placeholder="Choose Finnish cities..."
      maxCount={3}
      className="bg-input/30 w-full"
      variant={'secondary'}
    />
  )
}
