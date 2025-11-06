'use server'

import { notFound } from 'next/navigation'

export async function getFacilityWithId(id: string) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL}`
      : 'http://localhost:3000'

  const res = await fetch(`${base}/api/explore/${id}`, { cache: 'no-store' })

  if (!res.ok) notFound()

  const { data, category } = await res.json()
  return { data, category }
}

export async function getCategoryDefinition(typeCode: string) {
  const res = await fetch(`https://api.lipas.fi/v2/sports-site-categories/${typeCode}`, {
    cache: 'force-cache',
  })

  if (!res.ok) throw new Error('Failed to fetch category definition')
  return res.json()
}
