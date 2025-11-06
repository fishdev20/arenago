'use client'

import { MultiSelect } from '@/components/ui/multi-select'
import { useSearchStore } from '@/store/search-store'
import { useEffect, useState } from 'react'

type FacilitiesCategory = {
  'type-code': string
  name: {
    en: string
    fi: string
    se: string
  }
}

export default function FacilitiesSelector() {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([])
  const { selectedFacilities, setSelectedFacilities } = useSearchStore()
  useEffect(() => {
    fetch('https://api.lipas.fi/v2/sports-site-categories')
      .then((res) => res.json())
      .then((data: FacilitiesCategory[]) => {
        setOptions(
          data.map((sport) => ({
            value: sport['type-code'],
            label: sport.name.en || sport.name.fi, // fallback if no English name
          }))
        )
      })
      .catch((err) => console.error('❌ Failed to load sports categories', err))
  }, [])

  return (
    <div>
      <MultiSelect
        options={options}
        onValueChange={setSelectedFacilities}
        defaultValue={selectedFacilities}
        placeholder={'Choose sports facilities...'}
        maxCount={3}
        className="bg-input/30 w-full"
        variant={'secondary'}
      />
    </div>
  )
}
